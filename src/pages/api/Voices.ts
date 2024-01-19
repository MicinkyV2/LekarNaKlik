import type { APIContext } from 'astro';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    const text = body.text;

    if (!text || typeof text !== 'string') {
      return new Response('Invalid input', { status: 400 });
    }

    console.log(text);
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    const headers = new Headers({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length.toString(),
    });

    return new Response(buffer, { headers });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}