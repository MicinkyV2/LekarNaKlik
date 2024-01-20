import { Button } from "@nextui-org/react";
import React from "react";

export default function App({
	Text,
	buttonId,
}: {
	Text: string;
	buttonId?: string;
}) {
	return (
		<Button id={buttonId} color="primary">
			{Text}
		</Button>
	);
}
