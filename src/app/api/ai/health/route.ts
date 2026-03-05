import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getAIProvider, getAIConfig } from "@/lib/ai/provider";
import type { AIHealthStatus } from "@/lib/ai/types";

export async function GET() {
  const { baseURL, model } = getAIConfig();

  try {
    const result = await generateText({
      model: getAIProvider(),
      prompt: 'Say "hello" in one word.',
    });

    const status: AIHealthStatus = {
      status: "connected",
      response: result.text,
      provider: baseURL,
      model,
    };

    return NextResponse.json(status);
  } catch (error) {
    const status: AIHealthStatus = {
      status: "error",
      message: String(error),
      provider: baseURL,
      model,
    };

    return NextResponse.json(status, { status: 500 });
  }
}
