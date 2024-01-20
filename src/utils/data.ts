import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { Doctor } from "./types";

const dataFolder = path.join(process.cwd(), "/data");

export const getDoctors = (): Doctor[] => {
	const doctors: Doctor[] = [];
	const files = fs.readdirSync(dataFolder);

	console.log(files);

	// each file is named as {region}_{department}.csv
	files.forEach((file) => {
		const [department, region] = file.split(".")[0].split("_");
		const csv = fs.readFileSync(path.join(dataFolder, file), "utf8");
		const data = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
        }).data as Doctor[];

        data.forEach((row) => {
            const doctor: Doctor = {
                region,
                department,
                ...row,
            };

            if(!doctor.workplaceAddress) {
                return;
            }

            doctors.push(doctor);
        });
	});

	return doctors;
};
