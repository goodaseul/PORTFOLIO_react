// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";

const App: React.FC = () => {
    return (
        <div className="container">
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} /> {/* 기본 페이지 */}
                    <Route path="/about" element={<About />} />
                    <Route path="/project" element={<Project />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
