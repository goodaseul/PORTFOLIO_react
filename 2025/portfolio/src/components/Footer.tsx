import React, { useEffect, useState } from "react";
import Menu from "./Menu";
// db firebase
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
interface IInfo {
    id: string; // Firestore 문서 ID
    mail: string;
    github: string;
    portfolio: string;
    tel: number;
}
const Footer: React.FC = () => {
    const [infoDb, setinfoDb] = useState<IInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Firestore에서 데이터 가져오기
                const querySnapshot = await getDocs(collection(db, "info"));
                const fetchedinfoDb = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<IInfo, "id">),
                }));
                setinfoDb(fetchedinfoDb);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
            }
        };

        fetchData();
    }, []);

    const getLinkProps = (key: string, value: string) => {
        if (key === "Mail") return { to: `mailto:${value}`, target: undefined };
        if (key === "Tel") return { to: `tel:${value}`, target: undefined };
        return { to: value, target: "_blank" };
    };

    return (
        <footer>
            <div className="full_inner">
                {infoDb.map((item) => (
                    <ul className="menus menus_info" key={item.id}>
                        {Object.entries(item).map(
                            ([key, value]) =>
                                key !== "id" && ( // id 필드는 제외
                                    <li key={value}>
                                        <Link data-text={key} {...getLinkProps(key, value)}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Link>
                                    </li>
                                )
                        )}
                    </ul>
                ))}
                <div className="wrap_menu">
                    <Menu />
                    <p>&copy; 2025 JEONGDASEUL React Portfolio</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
