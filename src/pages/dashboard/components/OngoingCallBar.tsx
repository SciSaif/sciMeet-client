import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsRoomFullScreen } from "../../../redux/features/slices/otherSlice";

const OngoingCallBar = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const activeRooms = useAppSelector((state) => state.room.activeRooms);

    const callRoom = activeRooms.filter(
        (room) => !room.isGroup && room.roomCreator.userId !== user?._id
    )[0];

    return (
        <div
            onClick={() => {
                dispatch(setIsRoomFullScreen(true));
                // navigate by appending /room to the url
                window.history.pushState({}, "", "/dashboard/room");
            }}
            className="w-full  flex-row justify-between px-2 flex items-center text-sm bg-secondary h-[30px] cursor-pointer hover:bg-secondary-400"
        >
            <div>Tap to return to call</div>
            <div>{callRoom?.roomCreator.username}</div>
        </div>
    );
};

export default OngoingCallBar;
