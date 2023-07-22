import React, { useEffect, useRef } from "react";

interface Props {
    stream: MediaStream;
    isLocalStream: boolean;
}

const Video = ({ stream, isLocalStream }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        };
    }, [stream]);

    return (
        <div className="w-full h-1/2 rounded bg-black">
            <video ref={videoRef} muted={isLocalStream} autoPlay playsInline />
        </div>
    );
};

export default Video;
