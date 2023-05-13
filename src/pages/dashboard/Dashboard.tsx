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
    const user = useAppSelector((state) => state.auth.user);
    const sidebarOpen = useAppSelector((state) => state.other.sidebarOpen);
    const dispatch = useAppDispatch();

    // remove dark mode on load
    useEffect(() => {
        dispatch(setTheme("light"));
    }, []);

    return (
        <>
            <div className="bg-primaryDark h-screen fixed flex flex-row  overflow-hidden">
                <Sidebar />

                <div
                    className={`bg-secondaryDark h-screen w-full  rounded-l-lg   transition-all ease-out   md:absolute md:top-0 ${
                        sidebarOpen
                            ? "translate-x-[calc(100%-60px)] md:translate-x-0 md:left-[400px] md:w-[calc(100%-400px)]"
                            : "translate-x-0 md:translate-x-0 md:left-0"
                    } `}
                >
                    <DashboardHeader />
                    <div className="bg-red-300 w-10 h-10 fixed right-20 z-[100] top-0 text-blue-400">
                        sfdasdf
                    </div>
                    <div className="">
                        <ChatWindow />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
