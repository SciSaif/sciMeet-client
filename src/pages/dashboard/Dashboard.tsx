import { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar/Sidebar";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    setIsRoomFullScreen,
    setTheme,
    toggleSidebar,
} from "../../redux/features/slices/otherSlice";
import DashboardHeader from "./components/DashboardHeader";
import ChatWindow from "./chatWindow/ChatWindow";
import Room from "./room/Room";
import { useSwipeable } from "react-swipeable";
import settings from "../../utils/settings";
import { connectAllSocketHandlers } from "../../realtimeCommunication/socketHandlers";
import { useSnackbar } from "notistack";
import CallPopup from "../../components/CallPopup";
import OngoingCallBar from "./components/OngoingCallBar";

const Dashboard = () => {
    const windowWidth = useRef(window.innerWidth);
    const {
        sidebarOpen,
        modalOpen: isModalOpen,
        isRoomFullScreen,
    } = useAppSelector((state) => state.other);
    const dispatch = useAppDispatch();
    const { isUserInRoom } = useAppSelector((state) => state.room);

    let flag = true;
    // remove dark mode on load
    useEffect(() => {
        dispatch(setTheme("light"));
        if (flag) {
            dispatch(connectAllSocketHandlers());
        }

        return () => {
            flag = false;
        };
    }, []);

    const slide = (dir: "left" | "right") => {
        // dispatch({ type: dir, numItems });
        if (dir === "left" && sidebarOpen) {
            dispatch(toggleSidebar());
        } else if (dir === "right" && !sidebarOpen) {
            dispatch(toggleSidebar());
        }
        setTimeout(() => {
            // dispatch({ type: "stopSliding" });
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
            console.log("back button pressed", isRoomFullScreen);

            // if sidebar is closed in mobile then open it
            if (
                windowWidth.current < settings.md &&
                !sidebarOpen &&
                !isModalOpen
            ) {
                // console.log("toggle");

                dispatch(toggleSidebar());
            }

            //  if room is full screen then exit full screen
            if (isRoomFullScreen) {
                console.log("exit full screen");
                dispatch(setIsRoomFullScreen(false));
            }
        };

        window.addEventListener("popstate", handleBackButton);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [windowWidth, sidebarOpen, isModalOpen]);

    return (
        <div className="flex flex-col h-[100dvh] max-h-[100dvh]">
            {isUserInRoom && !isRoomFullScreen && <OngoingCallBar />}

            <div
                {...handlers}
                className="bg-primary-900 h-full relative w-full flex flex-row  overflow-hidden"
            >
                <Sidebar />

                <div
                    className={`bg-primary  w-full flex flex-col  rounded-l-lg   transition-all ease-out   md:absolute md:top-0 ${
                        sidebarOpen
                            ? "translate-x-[calc(100%-60px)] md:translate-x-0 md:left-[400px] md:w-[calc(100%-400px)]"
                            : "translate-x-0 md:translate-x-0 md:left-0"
                    } `}
                >
                    <DashboardHeader />

                    <div className=" h-full flex-grow ">
                        <ChatWindow />
                    </div>
                </div>
                {isUserInRoom && <Room />}
                <CallPopup />
            </div>
        </div>
    );
};

export default Dashboard;
