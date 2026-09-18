import dotenv from "dotenv";
import { tool } from "@langchain/core/tools";
import { ChatGroq } from "@langchain/groq";

dotenv.config();


// ======================
// LLM
// ======================

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile"
});


// ======================
// TOOL 1
// Calculator
// ======================

const calculatorTool = tool(
  async ({ a, b }) => {
    return String(a + b);
  },
  {
    name: "calculator",
    description: "Add two numbers together"
  }
);


// ======================
// TOOL 2
// Weather
// ======================

const weatherTool = tool(
  async ({ city }) => {
    return `The weather in ${city} is 30°C`;
  },
  {
    name: "weather",
    description: "Get current weather for a city"
  }
);


// ======================
// TOOL 3
// Resume Tool
// ======================

const resumeTool = tool(
  async () => {
    return `
    Devraj Sharma
    MEAN Stack Developer

    Skills:
    Angular
    Node.js
    Express.js
    MongoDB
    JWT
    LangChain
    `;
  },
  {
    name: "resume",
    description:
      "Get Devraj's resume information"
  }
);


// ======================
// AVAILABLE TOOLS
// ======================

const tools = [
  calculatorTool,
  weatherTool,
  resumeTool
];


// ======================
// USER QUESTION
// ======================

const userQuestion =
  "Tell me about Devraj's skills";


// ======================
// AGENT SIMULATION
// ======================

const toolDescriptions = tools
  .map(
    tool =>
      `${tool.name}: ${tool.description}`
  )
  .join("\n");


const prompt = `
You are an AI agent.

Available tools:

${toolDescriptions}

User Question:
${userQuestion}

Decide which tool should be used.
Return only the tool name.
`;

const decision =
  await llm.invoke(prompt);

const toolName =
  decision.content.trim();

console.log(
  "Chosen Tool:",
  toolName
);