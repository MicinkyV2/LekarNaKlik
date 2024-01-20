import type { APIContext } from "astro";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Client } from "langsmith";
import { LangChainTracer } from "langchain/callbacks";

export async function GET({ request }: APIContext) {
	const client = new Client({
		apiUrl: "https://api.smith.langchain.com",
		apiKey: import.meta.env.LANGCHAIN_API_KEY,
	});

	const tracer = new LangChainTracer({
		projectName: import.meta.env.LANGCHAIN_PROJECT_NAME,
		client,
	});

	const prompt = ChatPromptTemplate.fromMessages([
		["human", "Řekni mi nějaký zajímavý fakt o {topic}"],
	]);
	const model = new ChatOpenAI({
		openAIApiKey: import.meta.env.OPENAI_API_KEY,
	});
	const outputParser = new StringOutputParser();

	const chain = prompt.pipe(model).pipe(outputParser);

	const response = await chain.invoke({
		topic: "kočkách",
	});

	return new Response(response);
}
