import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Menu from "./Menu";
const Header = () => {
    const [scrollDown, setScrollDown] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const lastScrollY = useRef(0); // scroll 위치 추적용 ref

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const innerHeight = window.innerHeight;

            // Scroll down/up detection
            const isScrollingDown = scrollY > lastScrollY.current;
            setScrollDown(isScrollingDown);

            // 스크롤이 끝에 닿았을 때 'scroll' 클래스 제거
            if (scrollY + innerHeight >= scrollHeight) {
                if (headerRef.current) {
                    headerRef.current.classList.remove("scroll");
                }
            }

            lastScrollY.current = scrollY; // 현재 scrollY 값을 저장
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.toggle("scroll", scrollDown);
        }
    }, [scrollDown]);

    return (
        <header ref={headerRef}>
            <div className="full_inner">
                <h1>
                    <Link to="/">JEONG DASEUL</Link>
                </h1>
                <nav>
                    <Menu />
                </nav>
            </div>
        </header>
    );
};

export default Header;
