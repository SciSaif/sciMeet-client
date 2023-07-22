import {
    ComputerDesktopIcon,
    MicrophoneIcon,
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    setLocalStream,
    setRemoteStreams,
    setRoomState,
} from "../../../redux/features/slices/roomSlice";
import { leaveRoom } from "../../../realtimeCommunication/socketHandler";
import { closeAllConnections } from "../../../realtimeCommunication/webRTCHandler";

const RoomButtons = () => {
    const dispatch = useAppDispatch();
    const roomid = useAppSelector((state) => state.room.roomDetails?.roomid);
    const { localStream } = useAppSelector((state) => state.room);

    const leaveRoomHandler = () => {
        dispatch(
            setRoomState({
                isUserInRoom: false,
                isUserRoomCreator: false,
            })
        );

        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            dispatch(setLocalStream(null));
        }

        dispatch(setRemoteStreams([]));

        closeAllConnections();

        if (roomid) {
            leaveRoom(roomid);
        }
    };

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
                    onClick={leaveRoomHandler}
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
