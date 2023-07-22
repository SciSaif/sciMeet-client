import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Video from "./components/Video";

const VideoContainer = () => {
    const room = useAppSelector((state) => state.room);

    return (
        <div className="w-full grow grid grid-cols-1 sm:grid-cols-2  gap-2">
            {room.localStream && (
                <Video stream={room.localStream} isLocalStream={true} />
            )}

            {room.remoteStreams.map((stream) => (
                <Video key={stream.id} stream={stream} isLocalStream={false} />
            ))}
        </div>
    );
};

export default VideoContainer;
