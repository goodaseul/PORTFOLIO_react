// src/App.tsx
import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";

const App: React.FC = () => {
    const [scrollDown, setScrollDown] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    // const footerRef = useRef<HTMLDivElement | null>(null);
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
        <div className="container">
            <Header headerRef={headerRef} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project" element={<Project />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
