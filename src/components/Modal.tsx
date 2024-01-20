import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import React from "react";

let messages: ChatCompletionMessageParam[] = [];
let inputText: string;
messages.push({
	role: "assistant",
	content:
		"Jsi chatbot, který má za úkol poradit uživatelům k jakému typu doktora si mají zajít se svým problémem, podle jejich specializace. Svoje odpovědi ponechej stručné, ale stále podej alespoň nějaké informace nevíc a nechoď zbytečne do detailů pokud to uživatel nechce. Nabídni uživateli více informací.",
});

async function Chat(text: string) {
	messages.push({
		role: "user",
		content: text,
	});
	const response = await fetch(`/api/chat`, {
		role: "user",
		content: text,
	});
	const newData = (await response.text()) as string;
	console.log(newData);
	const parsedData = JSON.parse(newData);

	messages.push({
		role: "assistant",
		content: "parsedData",
	});
}

export default function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button onPress={onOpen}>AI</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">AI chat</ModalHeader>
							<ModalBody>
								<Card shadow="sm">
									<CardHeader className="pb-0">
										<Avatar showFallback />
										<h2 className="pl-2 text-lg">AI</h2>
									</CardHeader>
									<CardBody className="pt-1"></CardBody>
								</Card>
								<Card shadow="sm">
									<CardHeader className="justify-end pb-0">
										<h2 className="pr-2 text-lg">Vy</h2>
										<Avatar showFallback />
									</CardHeader>
									<CardBody className="pt-1"></CardBody>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Input
									placeholder="Zde napište svoji zprávu"
									value={inputText}
								/>
								<Button
									color="success"
									className="py-7"
									onClick={() => Chat(inputText)}
								>
									<img src="/paper-plane-right.svg" alt="Odeslat" />
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
