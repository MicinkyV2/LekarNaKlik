import { Textarea } from "@nextui-org/react";

export default function App() {
	return (
		<Textarea
			label="Popis"
			labelPlacement="inside"
			placeholder="Přidejte popis"
			className="col-span-12 md:col-span-6 mb-6 md:mb-0"
		/>
	);
}
