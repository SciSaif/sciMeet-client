import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";

import { Bars3Icon } from "@heroicons/react/20/solid";
import SettingsDropdown from "./components/SettingsDropdown";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connectWithSocketServer } from "../../realtimeCommunication/socketConnection";
import { setTheme } from "../../redux/features/slices/otherSlice";
import DashboardHeader from "./components/DashboardHeader";
import ChatWindow from "./components/ChatWindow";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    // remove dark mode on load
    useEffect(() => {
        dispatch(setTheme("light"));
    }, []);

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
                <DashboardHeader toggle={toggle} />
                <div className="">
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
