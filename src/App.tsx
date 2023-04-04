import { useState, Suspense } from "react";
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

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="font-sans lightHeroGradient dark:darkHeroGradient  min-h-screen">
            <Router>
                <Routes>
                    <>
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
                        <Route path="/newuser" element={<NewUser />} />
                    </>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </Router>
            <GlobalToastHandler />
        </div>
    );
}

export default App;
