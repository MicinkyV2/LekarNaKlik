import type { APIContext } from "astro";
import { getDoctors } from "../../utils/data";
import Fuse from "fuse.js";

export async function GET({url}: APIContext) {
    const { searchParams } = url;
    const regID = searchParams.get("regID") ?? "";

    const doctors = getDoctors();

    const result = doctors.find((item) => `${item.registrationNumber}*${item.workplaceAddress}` === regID);

    const data = JSON.stringify(result);

    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}