import { Card, CardBody } from "@nextui-org/react";

export default function SearchCard({name, address, phone}: {name: string, address: string, phone: string}) {
	return (
        <Card key={name} shadow="md" isPressable>
            <CardBody>
                <h4 className="text-2xl font-bold">{name}</h4>
                <p>{address}</p>
                <p>{phone}</p>
            </CardBody>
        </Card>
    );
}
