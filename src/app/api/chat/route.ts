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
// Visitors ask about a CV, not paste novels; cap what reaches the model.
const MAX_MESSAGE_CHARS = 2000;
const MAX_REPLY_TOKENS = 700;

// Only user/assistant turns are accepted from the client. A forged "system"
// turn in the history would otherwise sit next to the real system prompt.
const isChatMessage = (value: unknown): value is ChatMessage =>
  !!value &&
  typeof value === "object" &&
  ((value as ChatMessage).role === "user" || (value as ChatMessage).role === "assistant") &&
  typeof (value as ChatMessage).content === "string";

function getOpenAIErrorReply(status: number, errorBody: string): string {
  try {
    const parsed = JSON.parse(errorBody);
    const code = parsed?.error?.code;
    const type = parsed?.error?.type;

    if (status === 429 && (code === "insufficient_quota" || type === "insufficient_quota")) {
      return "The AI assistant is temporarily unavailable. Please email ashseryoja@gmail.com or try again later.";
    }

    if (status === 429) {
      return "The AI assistant is getting a lot of questions right now. Please try again in a moment.";
    }
  } catch {
    // Fall back to the generic message below when the upstream error is not JSON.
  }

  return "The AI assistant could not answer just now. Please try again in a moment.";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Chat API: OPENAI_API_KEY is not configured.");
      return NextResponse.json(
        { reply: "The AI assistant is offline right now. Please use the contact page instead." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const userMessage: string = String(body.chatInput || body.message || body.query || "").trim();

    if (!userMessage) {
      return NextResponse.json({ reply: "Empty message." }, { status: 400 });
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(isChatMessage)
          .slice(-MAX_HISTORY)
          .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
      : [];

    const messages = [
      { role: "system", content: getSystemPrompt() },
      ...history,
      { role: "user", content: userMessage.slice(0, MAX_MESSAGE_CHARS) },
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
        temperature: 0.4,
        max_completion_tokens: MAX_REPLY_TOKENS,
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
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Something went wrong on my side. Please try again in a moment." },
      { status: 500 }
    );
  }
}
