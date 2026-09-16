import dotenv from "dotenv";

import { OpenAIEmbeddings } from "@langchain/openai";

import { InMemoryVectorStore }
from "@langchain/core/vectorstores";

import { ChatGroq }
from "@langchain/groq";

dotenv.config();


// =========================
// LLM
// =========================

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile"
});


// =========================
// Embeddings
// =========================

const embeddings = new OpenAIEmbeddings();


// =========================
// Vector Store
// =========================

    const vectorStore =
    new InMemoryVectorStore(embeddings);


// =========================
// Knowledge Base
// =========================

await vectorStore.addDocuments([
  {
    pageContent:
      "Node.js is used for backend development."
  },
  {
    pageContent:
      "Angular is a frontend framework developed by Google."
  },
  {
    pageContent:
      "MongoDB is a NoSQL document database."
  },
  {
    pageContent:
      "JWT stands for JSON Web Token and is used for authentication."
  }
]);


// =========================
// User Question
// =========================

const userQuestion =
  "What is JWT used for?";


// =========================
// Similarity Search
// =========================

const docs =
  await vectorStore.similaritySearch(
    userQuestion,
    2
  );


// =========================
// Context Creation
// =========================

const context =
  docs
    .map(doc => doc.pageContent)
    .join("\n");


// =========================
// Prompt
// =========================

const prompt = `
Answer using only the context below.

Context:
${context}

Question:
${userQuestion}
`;


// =========================
// LLM Call
// =========================

const response =
  await llm.invoke(prompt);

console.log(response.content);