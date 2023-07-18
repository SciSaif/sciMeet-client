import { PlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../../redux/features/slices/otherSlice";
// import { getCurrentBreakpoint } from "../../../../hooks/useTailwindBreakpoints";
import { useRef } from "react";
import { useCreateNewRoomMutation } from "../../../../redux/features/apis/roomApi";
import { useAppSelector } from "../../../../redux/hooks";
import ActiveRoomButton from "./ActiveRoomButton";
import { setRoomState } from "../../../../redux/features/slices/roomSlice";

const SidebarLeft = () => {
    const dispatch = useDispatch();
    // const size = getCurrentBreakpoint();
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const [createRoom] = useCreateNewRoomMutation();

    const activeRooms = useAppSelector((state) => state.room.activeRooms);

    const handleAddRoom = () => {
        dispatch(
            setRoomState({
                isUserInRoom: true,
                isUserRoomCreator: true,
            })
        );
        // if (size === "sm") dispatch(toggleSidebar());
        if (windowSize.current[0] < 760) dispatch(toggleSidebar());
        createRoom();
    };

    return (
        <>
            {" "}
            <div className="bg-transparent h-screen w-24 px-2 py-4 flex flex-col  gap-y-2">
                <div className="w-full h-16 text-white bg-secondary  rounded-2xl flex justify-center items-center">
                    {/* <UserGroupIcon width={20} /> */}
                    <UsersIcon width={30} />
                </div>
                <button
                    onClick={handleAddRoom}
                    className="w-full h-16 text-white bg-tertiary hover:bg-tertiary-600  rounded-2xl flex justify-center items-center"
                >
                    {/* <UserGroupIcon width={20} /> */}
                    <PlusIcon width={30} />
                </button>

                {activeRooms.map((room) => (
                    <ActiveRoomButton key={room.roomid} room={room} />
                ))}
            </div>
        </>
    );
};

export default SidebarLeft;
