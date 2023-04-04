import React, { useState } from "react";
import { useTestQuery } from "../../redux/features/apis/authApi";
import Sidebar from "./components/Sidebar";
import Hamburger from "../../assets/Hamburger";

const Dashboard = () => {
    const { data } = useTestQuery();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-primaryDark h-screen flex flex-row relative overflow-hidden">
            <Sidebar />

            <div
                className={`bg-secondaryDark h-screen w-full  rounded-l-lg   transition-all ease-out   md:absolute md:top-0 ${
                    isOpen
                        ? "translate-x-[calc(100%-60px)] md:translate-x-0 md:left-[400px] md:w-[calc(100%-400px)]"
                        : "translate-x-0 md:translate-x-0 md:left-0"
                } `}
            >
                <div className="fixed  shadow-md h-14  w-full ">
                    <div
                        onClick={toggle}
                        className="ml-4 h-full w-fit flex  items-center"
                    >
                        <Hamburger />
                    </div>
                </div>
                <div className=" h-screen w-full pt-14 "></div>
            </div>
        </div>
    );
};

export default Dashboard;
