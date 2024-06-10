import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";

const App = () => {
    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<HomeView />}></Route>
                    <Route path="/about" element={<AboutView />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
