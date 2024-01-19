import { Button } from "@nextui-org/react";
import React from "react";

export default function App( {Text}: {Text: string}) {
	return <Button color="primary">{Text}</Button>;
}
