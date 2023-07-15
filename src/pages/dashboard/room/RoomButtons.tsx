import {
    ComputerDesktopIcon,
    MicrophoneIcon,
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const RoomButtons = () => {
    return (
        <div className="w-full  bg-secondary flex justify-center items-center ">
            <div className="flex flex-row gap-x-4 text-white">
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <ComputerDesktopIcon width={20} />
                </div>
                <div className="cursor-pointer hover:text-white/80 p-3">
                    <MicrophoneIcon width={20} />
                </div>
                <div className="cursor-pointer hover:text-white/80 p-3">
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
