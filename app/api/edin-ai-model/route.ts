import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (!process.env.EDEN_AI_API_KEY) {
      throw new Error("EDEN_AI_API_KEY not found");
    }

    const { 
      provider, 
      prompt, 
      systemPrompt, 
      temperature, 
      max_tokens,
      conversationHistory 
    } = await request.json();

    const headers = {
      Authorization: "Bearer " + process.env.EDEN_AI_API_KEY,
      "Content-Type": "application/json",
    };

    const messages = [
      {
        "role": "system",
        "content": [{ "type": "text", "content": { "text": systemPrompt }}]
      },
      ...conversationHistory.map(msg => ({
        "role": msg.role,
        "content": [{ "type": "text", "content": { "text": msg.content }}]
      })),
      {
        "role": "user",
        "content": [{ "type": "text", "content": { "text": prompt }}]
      }
    ];

    const response = await fetch("https://api.edenai.run/v2/multimodal/chat", {
      method: "POST",
      headers,
      body: JSON.stringify({
        providers: [provider],
        messages,
        temperature,
        max_tokens
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    const result = await response.json();
    return NextResponse.json({
      role: "assistant",
      content: result[provider].generated_text
    });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" }, 
      { status: 500 }
    );
  }
}
