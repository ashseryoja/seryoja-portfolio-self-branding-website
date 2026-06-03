import { NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/persona";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_HISTORY = 20;

function getOpenAIErrorReply(status: number, errorBody: string): string {
  try {
    const parsed = JSON.parse(errorBody);
    const code = parsed?.error?.code;
    const type = parsed?.error?.type;

    if (status === 429 && (code === "insufficient_quota" || type === "insufficient_quota")) {
      return "AI chat is temporarily unavailable: the server OpenAI quota is exhausted. Please check billing or replace the API key.";
    }

    if (status === 401) {
      return "AI chat is temporarily unavailable: the server OpenAI API key is invalid.";
    }

    if (status === 404 || code === "model_not_found") {
      return `AI chat is temporarily unavailable: the configured model (${MODEL}) is not available for this API key.`;
    }
  } catch {
    // Fall back to the generic message below when the upstream error is not JSON.
  }

  return "Upstream LLM error. Try again in a moment.";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const userMessage: string =
      body.chatInput || body.message || body.query || "";

    if (!userMessage.trim()) {
      return NextResponse.json(
        { reply: "Empty message." },
        { status: 400 }
      );
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (m: unknown): m is ChatMessage =>
              !!m &&
              typeof m === "object" &&
              (m as ChatMessage).role !== undefined &&
              typeof (m as ChatMessage).content === "string"
          )
          .slice(-MAX_HISTORY)
      : [];

    const messages = [
      { role: "system", content: getSystemPrompt() },
      ...history,
      { role: "user", content: userMessage },
    ];

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", response.status, errText);
      return NextResponse.json(
        { reply: getOpenAIErrorReply(response.status, errText) },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I didn't catch that — could you rephrase?";

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Chat API error:", message, error);
    return NextResponse.json(
      { reply: `Internal server error: ${message}` },
      { status: 500 }
    );
  }
}
