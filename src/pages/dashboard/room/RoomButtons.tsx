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
    toggleLocalStreamChanged,
} from "../../../redux/features/slices/roomSlice";
import { leaveRoom } from "../../../realtimeCommunication/socketHandler";
import {
    closeAllConnections,
    getLocalStream,
    setLocalStream,
    setRemoteStreams,
    stopScreenSharing,
    switchOutgoingTracks,
} from "../../../realtimeCommunication/webRTCHandler";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";
import { leaveRoomHandler } from "../../../utils/roomUtils";

const constraints = {
    audio: false,
    video: true,
};

const RoomButtons = () => {
    const windowWidth = useRef(window.innerWidth);

    const dispatch = useAppDispatch();
    //  dont remove room here, its needed for rerendering
    const room = useAppSelector((state) => state.room);
    const localStream = getLocalStream();
    const [cameraEnabled, setCameraEnabled] = React.useState(true);
    const [micEnabled, setMicEnabled] = React.useState(true);
    const [screenShareEnabled, setScreenShareEnabled] = React.useState(false);

    const handleToggleCamera = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled =
                !localStream.getVideoTracks()[0].enabled;
            setCameraEnabled(!cameraEnabled);
            dispatch(toggleLocalStreamChanged());
        }
    };

    const handleToggleMic = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled =
                !localStream.getAudioTracks()[0].enabled;
            setMicEnabled(!micEnabled);
            dispatch(toggleLocalStreamChanged());
        }
    };

    const handleToggleScreenShare = async () => {
        if (!screenShareEnabled) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(
                    constraints
                );
            } catch (e: any) {
                console.error(
                    "error when trying to get an access to screen share stream",
                    e
                );
            }

            if (stream) {
                switchOutgoingTracks(stream);
                setScreenShareEnabled(true);
            }
        } else {
            // stop screen sharing
            if (localStream) {
                switchOutgoingTracks(localStream, true);
                stopScreenSharing();
                setScreenShareEnabled(false);
            }
        }
    };

    return (
        <div className="w-full  bg-secondary flex justify-center items-center ">
            <div className="flex flex-row gap-x-4 text-white">
                <div
                    className="hidden sm:flex cursor-pointer hover:text-white/80 group p-3 relative hover:bg-white/10 rounded-full "
                    onClick={handleToggleScreenShare}
                >
                    <div className="sm:group-hover:scale-125">
                        <ComputerDesktopIcon width={20} />
                        {screenShareEnabled && (
                            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-[2px] rotate-45 rounded-full bg-white"></div>
                        )}
                    </div>
                </div>
                <div
                    className="cursor-pointer hover:text-white/80 group p-3 relative hover:bg-white/10 rounded-full "
                    onClick={handleToggleMic}
                >
                    <div className="sm:group-hover:scale-125">
                        <MicrophoneIcon width={20} />
                        {!micEnabled && (
                            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-[2px] rotate-45 rounded-full bg-white"></div>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => leaveRoomHandler(windowWidth.current)}
                    className="cursor-pointer hover:text-white/80 group p-3 hover:bg-white/10 rounded-full "
                >
                    <XMarkIcon
                        width={20}
                        className="sm:group-hover:scale-150"
                    />
                </div>
                <div
                    className="cursor-pointer hover:text-white/80 group p-3 relative hover:bg-white/10 rounded-full "
                    onClick={handleToggleCamera}
                >
                    <div className="sm:group-hover:scale-125">
                        <VideoCameraIcon width={20} />
                        {!cameraEnabled && (
                            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-7 h-[2px] rotate-45 rounded-full bg-white"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomButtons;
