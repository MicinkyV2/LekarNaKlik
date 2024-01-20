import React, { type ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
import { useStore } from "@nanostores/react";
import { searchQuery } from "../utils/atoms";

export default function App() {
	const search = useStore(searchQuery);

	// Update the store value when the input changes
	const handleInputChange = (event: ChangeEvent) => {
		searchQuery.set((event.target as HTMLInputElement).value);
	};

	return (
		<Input
			type="text"
			label="Hledejte lékaře!"
			className="w-[300px] border-1 border-black rounded-xl "
			value={search}
            onChange={handleInputChange}
		/>
	);
}
