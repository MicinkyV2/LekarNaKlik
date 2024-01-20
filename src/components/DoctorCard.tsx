import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
} from "@nextui-org/react";

export default function DoctorCard({
	name,
	address,
	department,
	region,
}: {
	name: string;
	address: string;
	department: string;
	region: string;
}) {
	return (
		<Card className="w-[600px]">
			<CardHeader className="flex gap-3">
				<Image
					alt="nextui logo"
					height={40}
					radius="full"
					src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
					width={40}
				/>
				<div className="flex flex-col">
					<p className="text-md">{name}</p>
					<p className="text-small text-default-500">{department}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{address}</p>
			</CardBody>
			<Divider />
			<CardFooter>{region}</CardFooter>
		</Card>
	);
}
