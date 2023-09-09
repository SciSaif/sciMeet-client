import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";

import { Bars3Icon } from "@heroicons/react/20/solid";
import SettingsDropdown from "./components/SettingsDropdown";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    setTheme,
    toggleSidebar,
} from "../../redux/features/slices/otherSlice";
import DashboardHeader from "./components/DashboardHeader";
import ChatWindow from "./chatWindow/ChatWindow";
import Room from "./room/Room";
import { connectWithSocketServer } from "../../realtimeCommunication/socketHandler";
import { store } from "../../redux/store";
import { useSwipeable } from "react-swipeable";

const Dashboard = () => {
    const user = useAppSelector((state) => state.auth.user);
    const sidebarOpen = useAppSelector((state) => state.other.sidebarOpen);
    const dispatch = useAppDispatch();
    const isRoomOpen = useAppSelector((state) => state.room.isUserInRoom);
    let flag = true;
    // remove dark mode on load
    useEffect(() => {
        dispatch(setTheme("light"));
        if (flag) {
            connectWithSocketServer(store.getState, dispatch);
        }

        return () => {
            flag = false;
        };
    }, []);

    const slide = (dir: "left" | "right") => {
        // dispatch({ type: dir, numItems });
        console.log("sliding ", dir);
        if (dir === "left" && sidebarOpen) {
            dispatch(toggleSidebar());
        } else if (dir === "right" && !sidebarOpen) {
            dispatch(toggleSidebar());
        }
        setTimeout(() => {
            // dispatch({ type: "stopSliding" });
            console.log("sliding stopped");
        }, 50);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => slide("left"),
        onSwipedRight: () => slide("right"),
        delta: 100,
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <>
            <div
                {...handlers}
                className="bg-primary-900 h-[100dvh]  w-full flex flex-row  overflow-hidden"
            >
                <Sidebar />

                <div
                    className={`bg-primary  h-[100dvh] w-full  rounded-l-lg   transition-all ease-out   md:absolute md:top-0 ${
                        sidebarOpen
                            ? "translate-x-[calc(100%-60px)] md:translate-x-0 md:left-[400px] md:w-[calc(100%-400px)]"
                            : "translate-x-0 md:translate-x-0 md:left-0"
                    } `}
                >
                    <DashboardHeader />

                    <div className="">
                        <ChatWindow />
                    </div>

                    {isRoomOpen && <Room />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
