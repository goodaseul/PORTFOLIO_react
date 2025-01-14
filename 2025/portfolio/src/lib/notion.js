import { Client } from "@notionhq/client";

// 환경 변수에서 Notion API 키를 가져와 Notion 클라이언트 생성
const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

export default notionClient;
