import type { APIContext } from "astro";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";


const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export async function GET({ request }: APIContext) {
	const messageArray = await request.json() as ChatCompletionMessageParam[];
	//const messageArray: ChatCompletionMessageParam[] = [{ role: "user", content: "Dobrý den, mám problém s kolenem." }];

	const initialMessages: ChatCompletionMessageParam[] = [
		{ role: "system", content: "Jsi chatbot, který má za úkol poradit uživatelům k jakému typu doktora si mají zajít se svým problémem, podle jejich specializace. Svoje odpovědi ponechej stručné, ale stále podej alespoň nějaké informace nevíc a nechoď zbytečne do detailů pokud to uživatel nechce. Nabídni uživateli více informací." }
	];

	const completion = await openai.chat.completions.create({
		messages: [...initialMessages, ...messageArray],
		model: "gpt-4-1106-preview",
	});

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	console.log("sending response");

	return {
		status: 200, // HTTP status code for "OK"
		headers: headers,
		body: JSON.stringify(completion.choices[0].message.content), // Convert the completion object to a JSON string
	};
}
