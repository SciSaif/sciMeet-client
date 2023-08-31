import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import Video from "./components/Video";
import {
    getLocalStream,
    getRemoteStreams,
    getScreenSharingStream,
} from "../../../realtimeCommunication/webRTCHandler";
import { twMerge } from "tailwind-merge";

const VideoContainer = () => {
    // !! required for rerender
    const rerenderOnStateChange = useAppSelector((state) => state.room);
    const localStream = getLocalStream();
    const remoteStreams = getRemoteStreams();
    const screenSharingStream = getScreenSharingStream();
    console.log("remoteStreams", remoteStreams);
    console.log("screenSharingStream", screenSharingStream);
    console.log("localStream", getLocalStream());

    const [pinnedId, setPinnedId] = useState<string>("none");

    return (
        <div
            className={twMerge(
                "w-full overflow-hidden grow grid transition grid-cols-1 sm:grid-cols-2  gap-2 p-2 ",
                remoteStreams.length === 0 && "sm:grid-cols-1",
                pinnedId !== "none" && "grid-cols-1 sm:grid-cols-1"
            )}
        >
            {localStream && (
                <Video
                    stream={
                        screenSharingStream ? screenSharingStream : localStream
                    }
                    isLocalStream={true}
                    pinnedId={pinnedId}
                    setPinnedId={setPinnedId}
                />
            )}

            {remoteStreams.map((stream) => (
                <Video
                    key={stream.id}
                    stream={stream}
                    isLocalStream={false}
                    pinnedId={pinnedId}
                    setPinnedId={setPinnedId}
                />
            ))}
        </div>
    );
};

export default VideoContainer;
