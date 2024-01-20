import type { APIContext } from "astro";
import { getDoctors } from "../../utils/data";
import Fuse from "fuse.js";

export async function GET({url}: APIContext) {
    const { searchParams } = url;
    const limit = Number(searchParams.get("limit")) ?? 20;
    const offset = Number(searchParams.get("offset")) ?? 0;
    const search = searchParams.get("search") ?? "";

    let result = getDoctors();

    if(search) {
        const fuse = new Fuse(result, {
            keys: ["name", "workplaceAddress", "department", "region"],
        });

        result = fuse.search(search).map((item) => item.item);
    }

    const data = JSON.stringify(result.slice(offset, offset + limit));

    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}