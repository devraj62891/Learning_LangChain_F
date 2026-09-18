import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile"
});


// Prompt Template
const promptTemplate =
  PromptTemplate.fromTemplate(`
You are an expert career coach.

Answer the following question in a professional way.

Question:
{question}
`);


// Human Input
const userQuestion =
  "How do I become a Node.js developer?";


// Inject Human Input
const formattedPrompt =
  await promptTemplate.invoke({
    question: userQuestion
  });

console.log("Prompt Sent To LLM:\n");
console.log(formattedPrompt.toString());


// Send To LLM
const response =
  await llm.invoke(formattedPrompt);

console.log("\nAI Response:\n");
console.log(response.content);