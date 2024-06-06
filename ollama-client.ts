import { Ollama } from 'ollama';

// ollama client
export const embeddingModel = 'mxbai-embed-large';
// code: 'UND_ERR_HEADERS_TIMEOUT', occurs with default 5m, fix with OLLAMA_KEEP_ALIVE=-1
export const chatModel = 'llama3';
// export const chatModel = 'mistral';
// export const chatModel = 'phi3';
// export const chatModel = 'tinydolphin';

export const ollamaClient = new Ollama({ host: 'http://localhost:11434' })
// export const ollamaClient = new Ollama({ host: 'http://192.168.1.100:11434' })

// https://chatgpt.com/c/addf7ffc-f1d4-476c-b06b-3d4555dfa052


export const fetchEmbeddingWithRetry = async (prompt: string, model: string, maxRetries = 5, delay = 1000) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const { embedding } = await ollamaClient.embeddings({
        prompt: prompt,
        model: model
      });
      return embedding;
    } catch (error: any) {
      if ((error.status_code === 503 || error.code === 'UND_ERR_HEADERS_TIMEOUT') && attempt < maxRetries - 1) {
        console.log(`error: [${error}]`);
        // exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
        attempt++;
      } else {
        throw error;
      }
    }
  }
}

// const processChunks = async (chunks: string[], model: string) => {
//   const tasks = chunks.map(c => limit(() => fetchEmbeddingWithRetry(c, model)));
//   const embeddings = await Promise.all(tasks);
//   return embeddings;
// }