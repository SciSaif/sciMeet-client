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

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="font-sans lightHeroGradient dark:darkHeroGradient  min-h-screen">
            <Navbar />

            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
