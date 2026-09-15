//Just a simple example of embeddings api

import dotenv from "dotenv";
import { OpenAIEmbeddings } from "@langchain/openai";

dotenv.config();

const embeddings = new OpenAIEmbeddings();

const vector = await embeddings.embedQuery(
  "Node.js is a JavaScript runtime"
);

console.log(vector);