import type { APIContext } from "astro";
import { getDoctors } from "../../utils/data";

export async function GET({url}: APIContext) {
    const { searchParams } = url;

    let doctors = getDoctors();

    const uniqueRegions = [...new Set(doctors.map((doctor) => doctor.region))];
    const uniqueDepartments = [...new Set(doctors.map((doctor) => doctor.department))];

    const data = JSON.stringify({
        regions: uniqueRegions,
        departments: uniqueDepartments,
    });

    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}