import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import "../styles/page/about.css";

// 하위 컬렉션 문서에 들어갈 데이터
interface SubDocument {
    id: string;
    period: string;
    affiliation: string;
    title?: string;
    provide?: string;
    position?: string; // position 값 추가
    place?: string;
}

// 메인 문서에 들어갈 데이터
interface AboutDocument {
    id: string;
    period: string;
    affiliation: string;
    position?: string; // position 값 추가
    place?: string; // place 값 추가
    subCollection?: SubDocument[];
}
const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutDocument[]>([]);

    const skills = ["HTML", "CSS3", "SCSS", "JavaScript", "jQuery", "Bootstrap", "웹표준", "웹접근성", "반응형웹", "Figma", "Adobe Photoshop"];

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
                                place: data.place || "",
                            };
                        });
                    }

                    // about 문서에서 filed 값을 가져옵니다
                    const position = docSnapshot.data().position || ""; // position 필드를 가져오고, 없으면 기본값 빈 문자열
                    const place = docSnapshot.data().place || ""; // place 필드를 가져오고, 없으면 기본값 빈 문자열
                    allData.push({
                        id: docSnapshot.id,
                        period: docSnapshot.data().period || "",
                        affiliation: docSnapshot.data().affiliation || "",
                        position, // position 필드를 추가
                        place, // place 필드를 추가
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
        <div className="about">
            <div className="full_inner">
                {aboutData.map((doc) => (
                    <div className="wrap_subject" key={doc.id}>
                        <h2>{doc.id}</h2>
                        {/* subCollection이 있을 때만 출력 */}
                        {doc.subCollection && doc.subCollection.length > 0 ? (
                            <div className="wrap">
                                {doc.subCollection.map((subDoc) => (
                                    <div key={subDoc.id}>
                                        {subDoc.period && <p className="period">{subDoc.period}</p>}
                                        {subDoc.affiliation || subDoc.title ? <p className="part">{subDoc.affiliation || subDoc.title}</p> : null}
                                        {subDoc.position && <p>{subDoc.position}</p>}
                                        {subDoc.provide && <p>{subDoc.provide}</p>}
                                        {subDoc.place && <p>{subDoc.place}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // subCollection이 없을 경우 아무것도 출력하지 않음
                            <div className="wrap">
                                <div>
                                    <p className="period">{doc?.period}</p>
                                    <p className="part">{doc?.affiliation}</p>
                                    <p>{doc?.position}</p>
                                    <p>{doc?.place}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className="wrap_skill">
                    <h2>스킬</h2>
                    <ul>
                        {skills.map((item, index) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
