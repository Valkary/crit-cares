"use server";
import { getAllTables } from "~/db/server";

export async function GET() {
    const tables = await getAllTables();

    if (tables === undefined) return new Response(undefined);

    return new Response(JSON.stringify(tables));
}