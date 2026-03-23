import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import type { ZodType } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const DEFAULT_BASE_URL = "http://127.0.0.1:3456/v1";
const DEFAULT_API_KEY = "not-needed-for-local-proxy";
const DEFAULT_MODEL = "claude-sonnet-4";

// Use native fetch to bypass Next.js fetch patching in server actions
// Next.js extends fetch with caching/revalidation which can break AI SDK calls
const nativeFetch: typeof globalThis.fetch = (...args) =>
  globalThis.fetch(args[0], { ...args[1], cache: "no-store" } as RequestInit);

export function getAIProvider() {
  const provider = createOpenAI({
    baseURL: process.env.AI_BASE_URL || DEFAULT_BASE_URL,
    apiKey: process.env.AI_API_KEY || DEFAULT_API_KEY,
    // @ts-expect-error -- compatibility exists at runtime, missing from v3 types
    compatibility: "compatible",
    fetch: nativeFetch,
  });

  return provider.chat(process.env.AI_MODEL || DEFAULT_MODEL);
}

/**
 * Generate structured JSON output via text generation + Zod parsing.
 * Works with any OpenAI-compatible proxy (no tool calling required).
 * Injects the JSON schema into the prompt so the AI uses exact field names.
 */
export async function generateStructuredOutput<T>({
  system,
  prompt,
  schema,
  exampleOutput,
}: {
  system: string;
  prompt: string;
  schema: ZodType<T>;
  exampleOutput?: string;
}): Promise<T> {
  const model = getAIProvider();

  // Cast needed: zod-to-json-schema v3 types don't match Zod v4 ZodType
  const jsonSchema = zodToJsonSchema(schema as never, { target: "openApi3" });

  let schemaInstruction =
    "\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no explanation — just the JSON object." +
    "\n\nYou MUST use EXACTLY these field names (camelCase) and types. JSON Schema:\n" +
    JSON.stringify(jsonSchema, null, 2);

  if (exampleOutput) {
    schemaInstruction += "\n\nExample of the EXACT format expected:\n" + exampleOutput;
  }

  const result = await generateText({
    model,
    system: system + schemaInstruction,
    prompt,
  });

  // Strip markdown code fences if present
  let text = result.text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  }

  const parsed = JSON.parse(text);
  return schema.parse(parsed);
}

export function getAIConfig() {
  return {
    baseURL: process.env.AI_BASE_URL || DEFAULT_BASE_URL,
    model: process.env.AI_MODEL || DEFAULT_MODEL,
  };
}
