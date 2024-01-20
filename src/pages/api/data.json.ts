import type { APIContext } from "astro";
import { getDoctors } from "../../utils/data";

export async function GET({url}: APIContext) {
    const { searchParams } = url;
    const limit = Number(searchParams.get("limit")) ?? 20;
    const offset = Number(searchParams.get("offset")) ?? 0;

    const dataObject = getDoctors();
    const data = JSON.stringify(dataObject.slice(offset, offset + limit));

    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}