import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Video from "./components/Video";
import {
    getLocalStream,
    getRemoteStreams,
} from "../../../realtimeCommunication/webRTCHandler";
import { twMerge } from "tailwind-merge";

const VideoContainer = () => {
    // const room = useAppSelector((state) => state.room);
    const localStream = getLocalStream();
    const remoteStreams = getRemoteStreams();
    console.log("remoteStreams", remoteStreams);

    return (
        <div
            className={twMerge(
                "w-full overflow-hidden grow grid grid-cols-1 sm:grid-cols-2  gap-2 p-2 ",
                remoteStreams.length === 0 && "sm:grid-cols-1"
            )}
        >
            {localStream && <Video stream={localStream} isLocalStream={true} />}

            {remoteStreams.map((stream) => (
                <Video key={stream.id} stream={stream} isLocalStream={false} />
            ))}
        </div>
    );
};

export default VideoContainer;
