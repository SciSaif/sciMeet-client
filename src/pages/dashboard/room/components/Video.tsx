import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    stream: MediaStream;
    isLocalStream: boolean;
}

const Video = ({ stream, isLocalStream }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        };
    }, [stream]);

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <div
            className={twMerge(
                "w-full flex justify-center relative hover:border group hover:border-white/20 rounded bg-black overflow-hidden p-1",
                isLocalStream &&
                    "border border-secondary-600 hover:border-secondary-500"
            )}
        >
            <video
                ref={videoRef}
                muted={isLocalStream || isMuted}
                autoPlay
                playsInline
            />
            <div className="rounded-full bg-white/30 group-hover:flex hidden text-white absolute top-1/2 left-1/2 px-5 py-2 -translate-x-1/2">
                <button onClick={toggleMute}>
                    {isMuted ? "Unmute" : "Mute"}
                </button>
            </div>
        </div>
    );
};

export default Video;
