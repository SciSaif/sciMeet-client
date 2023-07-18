import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Video from "./components/Video";

const VideoContainer = () => {
    const room = useAppSelector((state) => state.room);

    return (
        <div className="w-full grow ">
            {room.localStream && (
                <Video stream={room.localStream} isLocalStream={true} />
            )}
        </div>
    );
};

export default VideoContainer;
