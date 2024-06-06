import fs from 'fs'
import { nanoid } from 'nanoid';
import axios from 'axios';
// import * as fs from 'fs';
import { calcElapsedTime, fileRead, splitTextIntoChunks } from './utils';
import { Surreal, RecordId, Table } from "surrealdb.js";
import { mokeEmbeddingSearch } from "./constants";
import { embeddingModel, fetchEmbeddingWithRetry, ollamaClient } from './ollama-client';
import { chunkSize, chunkoverlap, limit, embeddingSearchTable } from './constants';

interface Book {
  title: string;
  url: string;
}

const path = './books';
const books: Array<Book> = [
  // 61: IMPORTED OK
  {
    title: 'To the Person Sitting in Darkness by Mark Twain',
    url: 'https://gutenberg.org/cache/epub/62636/pg62636.txt',
  },
  // 210: IMPORTED OK
  // {
  //   title: 'Romeo and Juliet by William Shakespeare',
  //   url: 'https://gutenberg.org/cache/epub/1513/pg1513.txt',
  // },
  // 1576: INCOMPLETED stop at 681 with `HttpConnectionError: There was a problem with authentication` when suspend the laptop
  // {
  //   title: 'Moby Dick - Or, The Whale by Herman Melville',
  //   url: 'https://gutenberg.org/cache/epub/2701/pg2701.txt',
  // },
  // 954
  // {
  //   title: 'Pride and Prejudice by Jane Austen',
  //   url: 'https://gutenberg.org/cache/epub/1342/pg1342.txt',
  // },
  // 559
  // {
  //   title: 'Frankenstein - Or, The Modern Prometheus by Mary Wollstonecraft Shelley',
  //   url: 'https://gutenberg.org/cache/epub/84/pg84.txt',
  // },
  // 2292
  // {
  //   title: 'Middlemarch by George Eliot',
  //   url: 'https://gutenberg.org/cache/epub/145/pg145.txt',
  // },
  // 505: IMPORTED OK
  // {
  //   title: 'A Room with a View by E. M. Forster',
  //   url: 'https://gutenberg.org/cache/epub/2641/pg2641.txt',
  // },
  // 6969
  // {
  //   title: 'The Complete Works of William Shakespeare by William Shakespeare',
  //   url: 'https://gutenberg.org/cache/epub/100/pg100.txt',
  // },
  // 1392
  // {
  //   title: 'Little Women - Or, Meg, Jo, Beth, and Amy by Louisa May Alcott',
  //   url: 'https://gutenberg.org/cache/epub/37106/pg37106.txt',
  // },
  // 521: IMPORTED OK
  // {
  //   title: 'The Blue Castle - a novel by L. M. Montgomery',
  //   url: 'https://gutenberg.org/cache/epub/67979/pg67979.txt',
  // }
];

// db client
const db = new Surreal();
// Connect to the database
await db.connect("http://127.0.0.1:8000/rpc");

// Select a specific namespace / database
await db.use({
  namespace: "test",
  database: "test"
});

// Signin as a namespace, database, or root user
await db.signin({
  username: "root",
  password: "root",
});

const downloadText = async (url: string, filePath: string) => {
  try {
    const { data } = await axios.get(url, { responseType: 'text' });
    fs.writeFileSync(filePath, data, 'utf8');
    console.log(`downloaded '${url}' to '${filePath}'`);
  } catch (error) {
    console.error(`error downloading text from ${url}:`, error);
  }
};

// Array.forEach does not support async/await natively.
// books.forEach(async (e) => {
// fix using Promise.all(chunks.map
const processBooks = async () => {
  for (const e of books) {
    const startDate = new Date();
    const filePath = `${path}/${e.title}.txt`;
    // only download if file not exists
    if (!fs.existsSync(filePath)) {
      await downloadText(e.url, filePath);
    }

    const buffer = fileRead(filePath);
    const chunks = splitTextIntoChunks(buffer.toString(), chunkSize, chunkoverlap);

    await Promise.all(chunks.map(async (c, index) => limit(async () => {
      // get chunk embedding
      // const embedding = Array<Number>;
      // const { embedding } = await ollamaClient.embeddings({
      //   prompt: c,
      //   model: embeddingModel
      // });
      // prevent `ResponseError: server busy, please try again. maximum pending requests exceeded`
      const embedding: number[] | undefined = await fetchEmbeddingWithRetry(c, embeddingModel);

      const [created] = await db.create(embeddingSearchTable, {
        documentId: nanoid(8),
        title: e.title,
        url: e.url,
        chunkIndex: index,
        chunkText: c,
        embedding,
      });
      console.log(`  created: [${created.id}], '${created.title}', chunkIndex: ${created.chunkIndex}/${chunks.length}`);
    })));

    const elapsedTime = calcElapsedTime(startDate, new Date());

    console.log(`    created '${e.title}', elapsedTime: ${JSON.stringify(elapsedTime)}`);
  }
};

await processBooks();

await db.invalidate();
process.exit(0);