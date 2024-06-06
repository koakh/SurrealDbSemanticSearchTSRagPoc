async function getRelevantChunks(queryEmbedding: number[], topK: number): Promise<string[]> {
  // example function to search for top K similar embeddings
  const results = searchVectorDatabase(queryEmbedding, topK);

  // Assuming results contain the text or a way to fetch the text
  return results.map(result => result.text);
}

async function createOllamaRequest(queryEmbedding: number[], currentMessageContent: string) {
  const url = "http://localhost:11434/api/chat";
  
  // step 1: Get top K relevant chunks
  const relevantChunks = await getRelevantChunks(queryEmbedding, 10);

  // Step 2: Construct the prompt with the retrieved text sections
  const contextSections = relevantChunks.join('\n');
  const template = `
    You are a very enthusiastic freeCodeCamp.org representative who loves to help people! Given the following sections from the freeCodeCamp.org contributor documentation, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."
    
    Context sections:
    ${contextSections}
    
    Question: """
    ${currentMessageContent}
    """
  `;

  const payload = {
    model: "phi",
    messages: [
      { role: "system", content: template }
    ]
  };

  // Step 3: Make the API request
  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.status, error.response?.data);
      return { error: error.response?.status, message: error.response?.data };
    } else {
      console.error('Unexpected Error:', error);
      return { error: 'Unexpected Error', message: (error as Error).message };
    }
  }
}

// Example usage:
const queryEmbedding = [/* Your query embedding array here */];
const currentMessageContent = "How do I contribute to freeCodeCamp?";

createOllamaRequest(queryEmbedding, currentMessageContent)
  .then(response => console.log(response))
  .catch(error => console.error('Request failed:', error));
