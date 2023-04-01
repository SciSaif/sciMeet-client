import React from "react";
import { useTestQuery } from "../../redux/features/apis/authApi";

const Dashboard = () => {
    const { data } = useTestQuery();

    return <div>dashboard</div>;
};

export default Dashboard;
