import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 하위 컬렉션 문서에 들어갈 데이터
interface SubDocument {
    id: string;
    period: string;
    title?: string;
    provide?: string;
    position?: string; // position 값 추가
    affiliation: string;
}

// 메인 문서에 들어갈 데이터
interface AboutDocument {
    id: string;
    period: string;
    affiliation: string;
    position?: string; // position 값 추가
    subCollection?: SubDocument[];
}
const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutDocument[]>([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const db = getFirestore();
                const aboutCollectionRef = collection(db, "about");
                const aboutSnapshot = await getDocs(aboutCollectionRef);

                const allData: AboutDocument[] = [];

                for (const docSnapshot of aboutSnapshot.docs) {
                    const subCollectionRef = collection(docSnapshot.ref, "subCollection");
                    const subCollectionSnapshot = await getDocs(subCollectionRef);

                    let subCollectionData: SubDocument[] = [];
                    if (!subCollectionSnapshot.empty) {
                        subCollectionData = subCollectionSnapshot.docs.map((subDoc) => {
                            const data = subDoc.data();

                            return {
                                id: subDoc.id,
                                period: data.period || "",
                                title: data.title || "",
                                provide: data.provide || "",
                                position: data.position || "",
                                affiliation: data.affiliation || "",
                            };
                        });
                    }

                    // about 문서에서 filed 값을 가져옵니다
                    const position = docSnapshot.data().position || ""; // position 필드를 가져오고, 없으면 기본값 빈 문자열

                    allData.push({
                        id: docSnapshot.id,
                        period: docSnapshot.data().period || "",
                        affiliation: docSnapshot.data().affiliation || "",
                        position, // position 필드를 추가
                        subCollection: subCollectionData.length > 0 ? subCollectionData : undefined,
                    });
                }

                setAboutData(allData);
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };

        fetchAboutData();
    }, []);

    return (
        <div>
            <h1>About</h1>
            {aboutData.map((doc) => (
                <div key={doc.id}>
                    <p>{doc.id}</p>

                    {/* subCollection이 있을 때만 출력 */}
                    {doc.subCollection && doc.subCollection.length > 0 ? (
                        <div>
                            {doc.subCollection.map((subDoc) => (
                                <div key={subDoc.id}>
                                    <p>{subDoc.period}</p>
                                    <p>{subDoc.affiliation ? subDoc.affiliation : subDoc?.title}</p>
                                    <p>{subDoc.position}</p>
                                    <p>{subDoc?.provide}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // subCollection이 없을 경우 아무것도 출력하지 않음
                        <div>
                            <p>{doc.period}</p>
                            <p>{doc.affiliation}</p>
                            <p>{doc.position}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default About;
