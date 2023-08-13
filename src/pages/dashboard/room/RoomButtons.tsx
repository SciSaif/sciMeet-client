import {
    ComputerDesktopIcon,
    MicrophoneIcon,
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    setRoomDetails,
    // setLocalStream,
    // setRemoteStreams,
    setRoomState,
} from "../../../redux/features/slices/roomSlice";
import { leaveRoom } from "../../../realtimeCommunication/socketHandler";
import {
    closeAllConnections,
    getLocalStream,
    setLocalStream,
    setRemoteStreams,
} from "../../../realtimeCommunication/webRTCHandler";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";

const RoomButtons = () => {
    const windowWidth = useRef(window.innerWidth);

    const dispatch = useAppDispatch();
    const roomid = useAppSelector((state) => state.room.roomDetails?.roomid);
    const rerenderOnStateChange = useAppSelector((state) => state.room);
    const localStream = getLocalStream();
    const [cameraEnabled, setCameraEnabled] = React.useState(true);
    const [micEnabled, setMicEnabled] = React.useState(true);

    const leaveRoomHandler = () => {
        dispatch(
            setRoomState({
                isUserInRoom: false,
                isUserRoomCreator: false,
            })
        );
        dispatch(setRoomDetails(null));
        if (windowWidth.current < 768) {
            dispatch(toggleSidebar());
        }

        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            // dispatch(setLocalStream(null));
            setLocalStream(null);
        }

        setRemoteStreams([]);

        closeAllConnections();

        if (roomid) {
            leaveRoom(roomid);
        }
    };

    const handleToggleCamera = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled =
                !localStream.getVideoTracks()[0].enabled;
            setCameraEnabled(!cameraEnabled);
        }
    };

    const handleToggleMic = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled =
                !localStream.getAudioTracks()[0].enabled;
            setMicEnabled(!micEnabled);
        }
    };

    return (
        <div className="w-full  bg-secondary flex justify-center items-center ">
            <div className="flex flex-row gap-x-4 text-white">
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <ComputerDesktopIcon width={20} />
                </div>
                <div
                    className="cursor-pointer hover:text-white/80 p-3 relative"
                    onClick={handleToggleMic}
                >
                    <MicrophoneIcon width={20} />
                    {!micEnabled && (
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-[2px] rotate-45 rounded-full bg-white"></div>
                    )}
                </div>
                <div
                    onClick={leaveRoomHandler}
                    className="cursor-pointer hover:text-white/80 p-3"
                >
                    <XMarkIcon width={20} />
                </div>
                <div
                    className="cursor-pointer hover:text-white/80 p-3 relative"
                    onClick={handleToggleCamera}
                >
                    <VideoCameraIcon width={20} />
                    {!cameraEnabled && (
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-7 h-[2px] rotate-45 rounded-full bg-white"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomButtons;
