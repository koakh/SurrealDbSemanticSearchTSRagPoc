// OpenAI Assistants API – Course for Beginners
// https://www.youtube.com/watch?v=qHPonmSX4Ms
// links-gram:~/Development/AI/ollama/@Tutorials/freecodecamp-mongo-typescript/vector-search-tutorial/project-three
//
// project-three/_assets/questions.txt
//
// What is the best way to help with freeCodeCamp.org?
// How do I setup freeCodeCamp to run locally?
// What type of license is the freeCodeCamp codebase released under?

import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { embeddingSearchTable, limit, surrealClientConfig } from './constants';
import { nanoid } from 'nanoid';
import { embeddingModel, fetchEmbeddingWithRetry } from './ollama-client';
import { getSurrealClient } from './utils';
// import { MongoDBAtlasVectorSearch } from 'langchain/vectorstores/mongodb_atlas';
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { MongoClient } from 'mongodb';
// import 'dotenv/config';

// const client = new MongoClient(process.env.MONGODB_ATLAS_URI || '');
// const dbName = 'docs';
// const collectionName = 'embeddings';
// const collection = client.db(dbName).collection(collectionName);

// get client
const db = await getSurrealClient(surrealClientConfig);

const docsDir = './documents/fcc-docs';
const fileNames = await fsp.readdir(docsDir);
// console.log(fileNames);

for (const fileName of fileNames) {
  const document = await fsp.readFile(`${docsDir}/${fileName}`, 'utf8');
  console.log(`Vectorizing [${fileName}]`);

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('markdown', {
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const chunks = await splitter.createDocuments([document]);
  // console.log(`output: [${JSON.stringify(output, undefined, 2)}]`);

  // await MongoDBAtlasVectorSearch.fromDocuments(
  //   output,
  //   new OpenAIEmbeddings(),
  //   {
  //     collection,
  //     indexName: 'default',
  //     textKey: 'text',
  //     embeddingKey: 'embedding',
  //   }
  // );

  // debug output
  // await Promise.all(output.map(async (c, index) => limit(async () => {
  //   console.log(`${fileName} ${index}/${output.length} - c: [${JSON.stringify(c.pageContent, undefined, 2)}]`);
  // })));

  await Promise.all(chunks.map(async (c, index) => limit(async () => {
    // prevent `ResponseError: server busy, please try again. maximum pending requests exceeded`
    const embedding: number[] | undefined = await fetchEmbeddingWithRetry(c.pageContent, embeddingModel);
    const [created] = await db.create(embeddingSearchTable, {
      documentId: nanoid(8),
      title: `fcc-docs/${fileName}`,
      file: fileName,
      chunkIndex: index,
      chunkText: c.pageContent,
      embedding,
    });
    console.log(`  created: [${created.id}], '${created.title}', from file: ${fileName}, chunkIndex: ${created.chunkIndex}/${chunks.length}`);
  })));
}

// console.log('Done: Closing Connection');
// await client.close();
await db.invalidate();
process.exit(0);