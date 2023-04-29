import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user?.token) {
        return <Navigate to="/login" replace />;
    } else if (!user.username) {
        return <Navigate to="/newuser" replace />;
    } else {
        return <>{children}</>;
    }
};

export default ProtectedRoute;
