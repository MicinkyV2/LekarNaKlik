import React, { useEffect, useRef, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import DoctorCard from "./DoctorCard";
import type { Doctor } from "../utils/types";

export default function App() {
    const [data, setData] = useState<Doctor[]>([]);
    const offset = useRef(0); // Use a ref instead of state
    const loader = useRef(null);

    const loadMore = async () => {
        const response = await fetch(`/api/data.json?limit=20&offset=${offset.current}`);
        const newData = await response.json() as Doctor[];
        setData(prevData => [...prevData, ...newData]);
        offset.current += 20; // Update the offset
    };

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "200px",
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
                <DoctorCard name={item.name} department={item.department ?? ""} address={item.workplaceAddress} region={item.region ?? ""} key={item.name + item.department + item.region}/>
            ))}
            <div ref={loader} />
        </div>
    );
}