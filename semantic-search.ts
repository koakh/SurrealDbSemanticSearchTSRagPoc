import axios from "axios";
import { embeddingSearchTable, surrealClientConfig } from "./constants";
import { chatModel, embeddingModel, ollamaClient } from "./ollama-client";
import { calcElapsedTime, getSurrealClient } from "./utils";
import type { ChatRequest } from "ollama";

interface Record {
	id: string;
	chunkText: string;
	distance: number;
	title: string;
};

// get client
const db = await getSurrealClient(surrealClientConfig);

const startDate = new Date();

const [promptArg] = process.argv.slice(2);
if (!promptArg) {
	console.log(`you must supply a search prompt, for ex\npnpm semantic-search "how to get the ip from a c3 virtual machine?"`);
	process.exit(0);
}

// If you are doing information retrieval, please use the prompt Represent this sentence for searching relevant passages: for your query. For everything else, just use the text as it is.
// https://ollama.com/library/mxbai-embed-large
// https://www.mixedbread.ai/blog/mxbai-embed-large-v1
const prompt = `Represent this sentence for searching relevant passages: ${promptArg}`;
console.log(`using prompt: [${prompt}]`);

const { embedding: embeddingSearch } = await ollamaClient.embeddings({
	// prompt: 'what valancy do after cousin stickles knocked at her door?',
	// prompt: 'how to get the ip from a c3 virtual machine?',
	// prompt: 'create new action service on c3-system-core'	
	// from args
	prompt,
	model: embeddingModel,
	// use infinite here, else when work with llama3 it will stop after 5m (default)
	keep_alive: -1,
	options: {
		seed: 123,
		temperature: 0,
	}
});
// console.log(`embeddingSearch: [${embeddingSearch}]`);

const knnOperator = '<|20,150|>';
const query = `
	select 
		id, title, chunkText, vector::distance::euclidean($embeddingSearch, embedding) as distance
	from
		type::table($tb)
	where
		embedding ${knnOperator} $embeddingSearch
;`;
// console.log(`query: [${query}]`);
const result = await db.query(query, { tb: embeddingSearchTable, embeddingSearch });
const records: Array<Record> | unknown = result[0];
// console.log(`records: ${JSON.stringify(records, undefined, 2)}`);

const elapsedTime = calcElapsedTime(startDate, new Date());
console.log(`elapsedTime: ${JSON.stringify(elapsedTime)}`);

// async function createOllamaRequest(vectorEmbedding: number[], currentMessageContent: string) {
//   const url = "http://localhost:11434/api/chat";

//   // Step 1: Get relevant context based on vector embedding
//   const relevantContextSections = await getRelevantContext(vectorEmbedding, 3);

const contextSectionsArray: string[] = (records as Array<Record>).map((e: Record) => {
	return e['chunkText'].trim();
});
// console.log(`contextSections.length: ${contextSectionsArray.length}\ncontextSections: ${JSON.stringify(contextSectionsArray, undefined, 2)}`);

//   // Step 2: Construct the prompt
//   const contextSections = relevantContextSections.join('\n');
const contextSections = contextSectionsArray.join('\n');
// console.log(`contextSections: [${contextSections}]`);

// const template = `
// 	You are a very enthusiastic freeCodeCamp.org representative who loves to help people! Given the following sections from the freeCodeCamp.org contributor documentation, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."

// 	Context sections:
// 	${contextSections}

// 	Question: """
// 	${promptArg}
// 	"""
// `;
// console.log(`template: [${template}]\n`);

// /home/mario/Development/AI/ollama/@Python/python-ollama-embedding-by-praison
// const template2 = `Answer the question based only on the following context:
// ${contextSections}
// Question: ${promptArg}`;
// console.log(`template2: [${template2}]\n`);

const template3 = `
	You are a very book reader! Given the following book, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."

	Context sections:
	${contextSections}

	Question: """
	${promptArg}
	"""
`;
console.log(`template: [${template3}]\n`);

//   // Step 3: Make the API request
//   try {
//     const response = await axios.post(url, payload, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error:', error.response?.status, error.response?.data);
//       return { error: error.response?.status, message: error.response?.data };
//     } else {
//       console.error('Unexpected Error:', error);
//       return { error: 'Unexpected Error', message: (error as Error).message };
//     }
//   }
// }

// const response = await ollama.chat({ model: 'llama2', messages: [message], stream: true })
// for await (const part of response) {
//   process.stdout.write(part.message.content)
// }

console.log(`send chat request to ollama model: ${chatModel}, please wait......`);

const response = await ollamaClient.chat({
	model: chatModel,
	messages: [
		{
			// role <string>: The role of the message sender ('user', 'system', or 'assistant').
			role: 'system',
			// content <string>: The content of the message.			
			content: template3
		}
	],
	// format <string>: (Optional) Set the expected format of the response (json).
	// format: 'json',
	// stream <boolean>: (Optional) When true an AsyncGenerator is returned.
	stream: true
});

console.log('\nchat response:\n');
for await (const part of response) {
	process.stdout.write(part.message.content);
}
console.log('\n');

await db.invalidate();
process.exit(0);