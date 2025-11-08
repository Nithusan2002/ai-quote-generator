import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a creative quote generator. Respond with one short motivational quote about the given topic.",
        },
        { role: "user", content: topic || "motivation" },
      ],
    });

    const quote = completion.choices[0].message.content;
    return NextResponse.json({ quote });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}b
