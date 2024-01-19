import React from "react";
import {Input} from "@nextui-org/react";

export default function App() {
    return (
        <div className="flex justify-center pb-4">
        <Input
            type="text"
            label="Hledejte lékaře"
            defaultValue="Pepa Vomáčka"
            className="w-[300px]"
        />
        </div>
    );
}
