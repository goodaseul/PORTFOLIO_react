"use client";

import { useEffect, useState } from "react";
// Notion 데이터의 타입 정의
interface INotionItem {
    id: string;
    properties: {
        name: {
            title: { plain_text: string }[];
        };
    };
}

export default function Home() {
    const [notionData, setNotionData] = useState<INotionItem[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/notion");
                const data = await response.json();
                console.log(data); // 응답 데이터 확인
                setNotionData(data); // 'properties'만 포함된 데이터를 설정
            } catch (error) {
                console.error("Error fetching Notion data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Notion 데이터</h1>
            <ul>
                {notionData.map((item) => {
                    const title = item.properties.name?.title?.[0]?.plain_text;
                    return <li key={item.id}>{title || "제목없음"}</li>;
                })}
            </ul>
        </div>
    );
}
