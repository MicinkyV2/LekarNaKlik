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
import React, { useRef, type ChangeEvent, useEffect, useState } from "react";

export default function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
	const [inputText, setInputText] = useState<string>("");

	const onValueChange = (event: ChangeEvent) => {
		setInputText((event.target as HTMLInputElement).value);
	}

	async function Chat(text: string) {
		let localMessages = messages;
		localMessages = [...localMessages, { role: "user", content: text }]
		setMessages(localMessages);
		setInputText("");
		const response = await fetch(`/api/chat`, {
			method: "POST",
			body: JSON.stringify(localMessages),
		});
		const newData = (await response.text()) as string;

		localMessages = [...localMessages, { role: "assistant", content: newData }]
		setMessages(localMessages);
		Voice(newData);
	}

	async function Voice(text: string) {
		try {
			const request = new Request("/api/Voices", {
				method: "POST",
				body: JSON.stringify({ text }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const response = await fetch(request);

			if (response.ok) {
				const data = await response.arrayBuffer();
				if (!data) {
					console.error("No data received from the server");
					return;
				}
				const audioBlob = new Blob([data], { type: "audio/mpeg" });
				const audioUrl = URL.createObjectURL(audioBlob);
				const audio = document.querySelector("audio");
				if (audio) {
					audio.pause();
					audio.src = audioUrl;
					audio.play();
				} else {
					console.error("Audio element not found in the DOM");
				}
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	}

	useEffect(() => {
		setMessages([]);
		setMessages((messages) => [...messages, { role: "assistant", content: "Dobrý den, jak vám mohu pomoci?" }]);
	}, [isOpen]);

	return (
		<>
			<Button onPress={onOpen} color="primary" isIconOnly className="fixed bottom-4 right-4" size="lg"><img src="/chat-teardrop-dots.svg" className="invert" /></Button>
			<audio id="audio" src="" className="invisible" />
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">AI chat</ModalHeader>
							<ModalBody>
								<div className="flex flex-col gap-4">
								{messages.map((message) => (
									<Card shadow="sm" key={message.role + message.content}>
										{message.role === "assistant" ? (
											<CardHeader className="pb-0">
												<Avatar showFallback />
												<h2 className="pl-2 text-lg">AI</h2>
											</CardHeader>
										) : (
											<CardHeader className="justify-end pb-0">
												<h2 className="pr-2 text-lg">Vy</h2>
												<Avatar showFallback />
											</CardHeader>
										)}
										<CardBody className="pt-1">{message.content as string}</CardBody>
									</Card>
								))}
								</div>
							</ModalBody>
							<ModalFooter>
								<Input
									placeholder="Zde napište svoji zprávu"
									value={inputText}
									onChange={onValueChange}
									onSubmit={() => Chat(inputText)}
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
