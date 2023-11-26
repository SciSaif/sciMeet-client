import { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar/Sidebar";

import { Bars3Icon } from "@heroicons/react/20/solid";
import SettingsDropdown from "./components/SettingsDropdown";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    setIsRoomFullScreen,
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
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useSnackbar } from "notistack";
import { setRoomState } from "../../redux/features/slices/roomSlice";
import { getLocalStreamPreview } from "../../realtimeCommunication/webRTCHandler";
import JoinConfirmModal from "./sidebar/components/JoinConfirmModal";
import { rejectCall } from "../../realtimeCommunication/socketHandlers/rooms";

interface Participant {
    avatar: string;
    _id: string;
    username: string;
}
const defaultImg = settings.defaultImg;

const Dashboard = () => {
    const windowWidth = useRef(window.innerWidth);
    const user = useAppSelector((state) => state.auth.user);
    const {
        sidebarOpen,
        modalOpen: isModalOpen,
        isRoomFullScreen,
    } = useAppSelector((state) => state.other);
    const dispatch = useAppDispatch();
    const { isUserInRoom, roomDetails } = useAppSelector((state) => state.room);

    const activeRooms = useAppSelector((state) => state.room.activeRooms);

    const callRoom = activeRooms.filter(
        (room) => !room.isGroup && room.roomCreator.userId !== user?._id
    )[0];

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
    // const size = getCurrentBreakpoint();
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    // const room = useAppSelector((state) => state.room);

    // const activeRooms = useAppSelector((state) => state.room.activeRooms);

    // const callRoom = activeRooms.filter((room) => !room.isGroup)[0];

    const { enqueueSnackbar } = useSnackbar();
    const [joinRoomModal, setJoinRoomModal] = useState(false);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const friends = useAppSelector((state) => state.friend.friends);
    const room = activeRooms[0];

    useEffect(() => {
        if (
            friends &&
            room?.participants &&
            room.participants.length > 0 &&
            user
        ) {
            const participants = room.participants.map((participant) => {
                const friend = friends.find(
                    (friend) => friend._id === participant.userId
                );

                return {
                    _id: friend?._id || user?._id || "0",
                    avatar: friend?.avatar || user?.avatar || defaultImg,
                    username: friend?.username || user.username || "unknown",
                };
            });

            setParticipants(participants);
        }
    }, [friends, room, user]);
    return (
        <div className="flex flex-col h-[100dvh] max-h-[100dvh]">
            {isUserInRoom && !isRoomFullScreen && (
                <div
                    onClick={() => {
                        dispatch(setIsRoomFullScreen(true));
                    }}
                    className="w-full bg-secondary h-[30px] cursor-pointer hover:bg-secondary-400"
                >
                    On Call with someone
                </div>
            )}

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
                {callRoom && !isUserInRoom && (
                    <div className="absolute z-50 top-0 flex flex-row  min-w-[320px] justify-between items-center -translate-x-1/2   left-1/2 h-[70px] rounded-xl bg-primary-900 border-secondary border p-1">
                        <p className="text-white">
                            {callRoom.roomCreator.username} is Calling
                        </p>
                        <div className="flex flex-row gap-x-2">
                            <button
                                onClick={() => setJoinRoomModal(true)}
                                className="rounded-full p-2 h-10 w-10 bg-green-400 hover:bg-green-500"
                            >
                                <PhoneIcon width={20} />
                            </button>
                            <button
                                onClick={() => {
                                    rejectCall(callRoom.roomid);
                                }}
                                className="rounded-full p-2 h-10 w-10 bg-red-400 hover:bg-red-500 rotate-[135deg]"
                            >
                                <PhoneIcon width={20} />
                            </button>
                        </div>
                    </div>
                )}
                {joinRoomModal && (
                    <JoinConfirmModal
                        close={() => setJoinRoomModal(false)}
                        participants={participants}
                        room={room}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
