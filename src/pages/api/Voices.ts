import type { APIContext } from 'astro';
import OpenAI from "openai";



const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const text = body.text;
  console.log(text);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());

  return new Response(buffer)
}