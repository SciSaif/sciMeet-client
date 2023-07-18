import {
    ComputerDesktopIcon,
    MicrophoneIcon,
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setRoomState } from "../../../redux/features/slices/roomSlice";
import { leaveRoom } from "../../../redux/utils/socketHandler";

const RoomButtons = () => {
    const dispatch = useAppDispatch();
    const roomid = useAppSelector((state) => state.room.roomDetails?.roomid);

    return (
        <div className="w-full  bg-secondary flex justify-center items-center ">
            <div className="flex flex-row gap-x-4 text-white">
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <ComputerDesktopIcon width={20} />
                </div>
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <MicrophoneIcon width={20} />
                </div>
                <div
                    onClick={() => {
                        console.log("d");
                        dispatch(
                            setRoomState({
                                isUserInRoom: false,
                                isUserRoomCreator: false,
                            })
                        );
                        if (roomid) {
                            leaveRoom(roomid);
                        }
                    }}
                    className="cursor-pointer hover:text-white/80 p-3"
                >
                    <XMarkIcon width={20} />
                </div>
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <VideoCameraIcon width={20} />
                </div>
            </div>
        </div>
    );
};

export default RoomButtons;
