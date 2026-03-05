import { createOpenAI } from "@ai-sdk/openai";

const DEFAULT_BASE_URL = "http://localhost:3456/v1";
const DEFAULT_API_KEY = "not-needed-for-local-proxy";
const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export function getAIProvider() {
  const provider = createOpenAI({
    baseURL: process.env.AI_BASE_URL || DEFAULT_BASE_URL,
    apiKey: process.env.AI_API_KEY || DEFAULT_API_KEY,
  });

  return provider(process.env.AI_MODEL || DEFAULT_MODEL);
}

export function getAIConfig() {
  return {
    baseURL: process.env.AI_BASE_URL || DEFAULT_BASE_URL,
    model: process.env.AI_MODEL || DEFAULT_MODEL,
  };
}
