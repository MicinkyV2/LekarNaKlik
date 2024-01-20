import React from "react";
import {Card, CardBody} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function App() {
    return (
        <Card className="w-[300px] h-[300px]">
            <CardBody className="justify-center items-center">
                <Avatar showFallback className="h-[100px] w-[100px] border-1 border-black rounded-full mb-4"></Avatar>
                <p>Sdílí: 27 dokumentů</p>
                <p>Navštěvuje: 10 doktorů</p>
            </CardBody>
        </Card>
    );
}