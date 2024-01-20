import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
    Skeleton,
} from "@nextui-org/react";

export default function DoctorCardSkeleton() {
	return (
		<Card className="w-[600px]">
			<CardHeader className="flex gap-3">
                <div className="flex flex-col gap-1">
                    <Skeleton className="rounded-lg h-6 w-[220px]">
                        <div className="text-md h-6 w-[220px]"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg h-4 w-[260px]">
                        <div className="text-small text-default-500 h-4 w-[260px]"></div>
                    </Skeleton>
                </div>
			</CardHeader>
			<Divider />
			<CardBody>
                <Skeleton className="w-3/5 h-6 rounded-lg">
                    <div className="w-3/5 h-6 rounded-lg bg-default-200"></div>
                </Skeleton>
			</CardBody>
			<Divider />
			<CardFooter>
                <Skeleton className="w-4/12 h-6 rounded-lg">
                    <div className="w-4/12 h-6 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
		</Card>
	);
}
