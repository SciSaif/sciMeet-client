import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Dashboard from "./pages/dashboard/Dashboard";
import NewUser from "./components/NewUser";
import GlobalToastHandler from "./redux/GlobalToastHandler";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./redux/hooks";
import Home from "./pages/home/Home";
import Logout from "./pages/auth/Logout";

import global from "global";
import * as process from "process";
global.process = process;

function App() {
    const theme = useAppSelector((state) => state.other.theme);

    useEffect(() => {
        if (theme === "dark") {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    return (
        <div className="font-sans  lightHeroGradient dark:darkHeroGradient  h-[100dvh] ">
            <Router>
                <Routes>
                    <>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Navbar />
                                    <Home />
                                </>
                            }
                        />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/login"
                            element={
                                <>
                                    <Navbar />
                                    <LoginPage />
                                </>
                            }
                        />

                        <Route
                            path="/register"
                            element={
                                <>
                                    <Navbar />
                                    <RegisterPage />
                                </>
                            }
                        />
                        <Route
                            path="/newuser"
                            element={
                                <>
                                    <Navbar />

                                    <NewUser />
                                </>
                            }
                        />
                    </>

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
            <GlobalToastHandler />
        </div>
    );
}

export default App;
