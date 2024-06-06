import fs from 'fs'
// fse.readFileSync is not a function; must use fs.readFileSync, require to be imported, even if is not directly used
import fse from 'fs-extra/esm';
import Surreal from 'surrealdb.js';
import type { SurrealClientConfig } from './constants';

/**
 * Splitting text into chunks is a key technique for optimizing the storage, 
 * retrieval, and processing of large documents in a vector database. 
 * It enhances scalability, search precision, and overall performance, making it a valuable practice in building 
 * efficient and effective semantic search systems.
 * @param text 
 * @param chunkSize 
 * @param overlap 
 * @returns 
 */
export const splitTextIntoChunks = (text: string, chunkSize: number, overlap: number): string[] => {
  const chunks: string[] = [];
  let start = 0;
  const length = text.length;

  while (start < length) {
    const end = Math.min(start + chunkSize, length);
    let chunk = text.slice(start, end);

    // Ensure chunks end at a sentence boundary (optional but recommended)
    if (end < length) {
      const lastSpace = chunk.lastIndexOf(' ');
      if (lastSpace > 0) {
        chunk = chunk.slice(0, lastSpace);
      }
    }

    chunks.push(chunk);
    start += chunkSize - overlap; // Move start index with overlap
  }

  return chunks;
}

export const fileRead = (filePath: string): Buffer => {
  var contents: Buffer = fs.readFileSync(filePath);
  return contents;
}

export interface ElapsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  days?: number;
}

export const calcElapsedTimeMs = (elapsedMs: number): ElapsedTime => {
  const elapsed = new Date(elapsedMs);
  // subtract the timezone offset, else we have 1h and not 0h
  elapsed.setTime(elapsed.getTime() + elapsed.getTimezoneOffset() * 60 * 1000);
  const elapsedHours = elapsed.getHours();
  const elapsedMinutes = elapsed.getMinutes();
  const elapsedSeconds = elapsed.getSeconds();

  return { hours: elapsedHours, minutes: elapsedMinutes, seconds: elapsedSeconds, ms: elapsedMs };
};

export const calcElapsedTime = (start: Date, end: Date): ElapsedTime => {
  const elapsedMs: number = (end.getTime() - start.getTime());
  return calcElapsedTimeMs(elapsedMs);
};

export const getSurrealClient = async (config: SurrealClientConfig): Promise<Surreal> => {
  const { url, namespace, database, username, password } = config;
  // init surrealdb object
  const db = new Surreal();
  // connect to the database
  await db.connect(url);
  // select a specific namespace / database
  await db.use({ namespace, database });
  // signin as a namespace, database, or root user
  await db.signin({ username, password });
  // return client
  return db;
}