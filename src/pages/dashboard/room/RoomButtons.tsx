import {
    ComputerDesktopIcon,
    MicrophoneIcon,
    PhoneIcon,
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleLocalStreamChanged } from "../../../redux/features/slices/roomSlice";
import { getLocalStream } from "../../../realtimeCommunication/webRTCHandler";
import { leaveRoomHandler } from "../../../utils/roomUtils";
import { toggleScreenShare } from "../../../realtimeCommunication/screenShareHandler";
import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { setIsRoomFullScreen } from "../../../redux/features/slices/otherSlice";

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
        const res = await toggleScreenShare();
        setScreenShareEnabled(res);
    };
    const handleResize = () => {
        dispatch(setIsRoomFullScreen(false));
        // dispatch(toggleSidebar());
    };
    return (
        <div className="w-full py-2 flex justify-center items-center relative">
            <div className="flex flex-row gap-x-4 text-white">
                <div
                    className="hidden sm:flex cursor-pointer bg-white/10 hover:text-white/80 group p-3 relative hover:bg-white/20 rounded-full "
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
                    className="cursor-pointer hover:text-white/80 bg-white/10 group p-3 relative hover:bg-white/20 rounded-full "
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
                    className="cursor-pointer hover:text-white/80 bg-white/10 group p-3 relative bg-white/ hover:bg-white/20 rounded-full "
                    onClick={handleToggleCamera}
                >
                    <div className="sm:group-hover:scale-125">
                        <VideoCameraIcon width={20} />
                        {!cameraEnabled && (
                            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-7 h-[2px] rotate-45 rounded-full bg-white"></div>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => leaveRoomHandler(windowWidth.current)}
                    className="cursor-pointer  hover:text-white/80 group p-3 bg-red-500 hover:bg-red-600 rounded-full "
                >
                    <PhoneIcon
                        width={20}
                        className="scale-[130%]  rotate-[135deg] translate-y-[2px] hover:scale-[150%]"
                    />
                </div>
            </div>
            <div
                onClick={handleResize}
                // className="bottom-2   flex absolute  text-white right-2 w-8 h-8    justify-center items-center cursor-pointer"
                className="cursor-pointer  hover:text-white/80 bg-white/10 group p-3 absolute right-5 text-white hover:bg-white/20 rounded-full "
            >
                <ArrowsPointingInIcon width={20} />
            </div>
        </div>
    );
};

export default RoomButtons;
