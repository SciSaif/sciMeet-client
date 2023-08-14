import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    stream: MediaStream;
    isLocalStream: boolean;
}

const Video = ({ stream, isLocalStream }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log(stream);
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        };
    }, [stream]);

    return (
        <div
            className={twMerge(
                "w-full flex justify-center rounded bg-black overflow-hidden p-1",
                isLocalStream && "border border-secondary-600"
            )}
        >
            <video ref={videoRef} muted={isLocalStream} autoPlay playsInline />
        </div>
    );
};

export default Video;
