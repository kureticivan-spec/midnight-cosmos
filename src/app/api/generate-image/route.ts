import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            // Mock response if no key used (for testing UI)
            // return NextResponse.json({ url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" });
            return NextResponse.json({ error: "OpenAI API Key not configured" }, { status: 500 });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        return NextResponse.json({ url: response.data[0].url });
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Internal Error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
