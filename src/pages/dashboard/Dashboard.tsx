import { useState, useEffect, useRef } from "react";
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
import { store } from "../../redux/store";
import { useSwipeable } from "react-swipeable";
import settings from "../../utils/settings";
import { connectAllSocketHandlers } from "../../realtimeCommunication/socketHandlers";

const Dashboard = () => {
    const windowWidth = useRef(window.innerWidth);
    const user = useAppSelector((state) => state.auth.user);
    const sidebarOpen = useAppSelector((state) => state.other.sidebarOpen);
    const isModalOpen = useAppSelector((state) => state.other.modalOpen);
    const dispatch = useAppDispatch();
    const isRoomOpen = useAppSelector((state) => state.room.isUserInRoom);

    let flag = true;
    // remove dark mode on load
    useEffect(() => {
        dispatch(setTheme("light"));
        if (flag) {
            connectAllSocketHandlers();
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

    useEffect(() => {
        window.history.pushState(null, "");

        // Event listener for the popstate event
        const handleBackButton = () => {
            // if sidebar is closed in mobile then open it
            if (
                windowWidth.current < settings.md &&
                !sidebarOpen &&
                !isModalOpen
            ) {
                // console.log("toggle");
                dispatch(toggleSidebar());
            } else {
                // go back to previous page
                window.history.back();
            }
        };

        window.addEventListener("popstate", handleBackButton);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [windowWidth, sidebarOpen, isModalOpen]);

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
