import notionClient from "@/lib/notion";
import { NextResponse } from "next/server";

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID as string;
if (!NOTION_DATABASE_ID) {
    throw new Error("Missing NOTION_DATABASE_ID in environment variables.");
}

export async function GET() {
    try {
        // Notion 데이터베이스 쿼리 실행
        const response = await notionClient.databases.query({
            database_id: NOTION_DATABASE_ID,
        });

        // 결과에서 'properties'만 추출
        const propertiesData = response.results.map((item) => item);

        // 'properties'만 포함된 데이터를 반환
        return NextResponse.json(propertiesData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while fetching data.";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
