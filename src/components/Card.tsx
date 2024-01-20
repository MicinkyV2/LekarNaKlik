import React, { useEffect, useRef, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App() {
    const [data, setData] = useState(Array.from({ length: 20 })); // Initial data
const loader = useRef(null);

const loadMore = () => {
    // Fetch more data here and update the state
    setData(prevData => [...prevData, ...Array.from({ length: 20 })]);
};

useEffect(() => {
    var options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
        observer.observe(loader.current)
    }
}, []);

const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
        loadMore();
    }
}

return (
    <div className="flex flex-col gap-4 items-center">
        {data.map((item, index) => (
            <Card key={index} className="w-[600px]">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="full"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md"> Mudr. Pepa Novák</p>
                        <p className="text-small text-default-500"> drvoštěp</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p>200 let kolektivních zkušeností aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/nextui-org/nextui"
                    >
                        Naštivte stránku doktora.
                    </Link>
                </CardFooter>
            </Card>
        ))}
        <div ref={loader} />
    </div>
);
}