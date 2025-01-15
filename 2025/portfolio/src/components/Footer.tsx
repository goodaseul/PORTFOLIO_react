import React, { useEffect, useState } from "react";

// db firebase
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
interface About {
    id: string; // Firestore 문서 ID
    mail: string;
    github: string;
    portfolio: string;
    tel: number;
}

const Footer: React.FC = () => {
    const [aboutDb, setaboutDb] = useState<About[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Firestore에서 데이터 가져오기
                const querySnapshot = await getDocs(collection(db, "about"));
                const fetchedaboutDb = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<About, "id">),
                }));
                setaboutDb(fetchedaboutDb);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <footer>
            <>
                {aboutDb.map((item) => (
                    <ul key={item.id}>
                        {Object.entries(item).map(
                            ([key, value]) =>
                                key !== "id" && ( // id 필드는 제외
                                    <li key={value}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        {key === "Mail" ? (
                                            <a href={`mailto:${value}`}>{value}</a>
                                        ) : key === "Tel" ? (
                                            <a href={`tel:${value}`}>{value}</a>
                                        ) : (
                                            <a href={`${value}`} target="_blank">
                                                {value}
                                            </a>
                                        )}
                                    </li>
                                )
                        )}
                    </ul>
                ))}
            </>
            <p>&copy; 2025 My Portfolio</p>
        </footer>
    );
};

export default Footer;
