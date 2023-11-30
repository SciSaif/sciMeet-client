import { MicrophoneIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import PinIcon from "../../../../assets/PinIcon";
import { useAppSelector } from "../../../../redux/hooks";

interface Props {
    stream: MediaStream;
    isLocalStream: boolean;
    pinnedId: string;
    setPinnedId: (id: string) => void;
}

const Video = ({ stream, isLocalStream, pinnedId, setPinnedId }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const user = useAppSelector((state) => state.auth.user);
    const participants = useAppSelector(
        (state) => state.room.roomDetails?.participants
    );
    const friends = useAppSelector((state) => state.friend.friends);

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

    const isPinned = pinnedId === stream.id;

    useEffect(() => {
        let userName = "";
        if (!friends || !participants || isLocalStream) return;
        // @ts-ignore
        const { connUsersocketId } = stream;

        // find the connUsersocketId in participants
        participants?.forEach((participant) => {
            if (participant.socketId === connUsersocketId) {
                // get the username of friend
                friends.forEach((friend) => {
                    if (friend._id === participant.userId) {
                        userName = friend.username;
                    }
                });
            }
        });

        setUserName(userName);
    }, [friends, participants, stream]);

    return (
        <div
            className={twMerge(
                "w-full flex justify-center relative  group  rounded bg-black overflow-hidden p-1",
                isLocalStream &&
                    "border border-secondary-600 hover:border-secondary-500",
                pinnedId !== "none" && !isPinned && "hidden"
            )}
        >
            <video
                ref={videoRef}
                muted={isLocalStream || isMuted}
                autoPlay
                playsInline
            />

            <div className="rounded-full bg-primary gap-3 opacity-40 transition hover:opacity-70 group-hover:flex hidden text-white absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2">
                {!isLocalStream && (
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full hover:bg-white/20 relative flex justify-center items-center w-10 h-10"
                    >
                        <MicrophoneIcon width={20} />
                        {isMuted && (
                            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-[2px] rotate-45 rounded-full bg-white"></div>
                        )}
                    </button>
                )}
                <button
                    onClick={() => {
                        setPinnedId(
                            stream.id === pinnedId ? "none" : stream.id
                        );
                    }}
                    className="p-2 rounded-full hover:bg-white/20 relative flex justify-center items-center w-10 h-10"
                >
                    <PinIcon />
                    {isPinned && (
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-[2px] rotate-45 rounded-full bg-white"></div>
                    )}
                </button>
            </div>

            <div className="absolute bottom-2 left-2  text-sm text-white opacity-70 hover:opacity-100">
                <p>{isLocalStream ? user?.username : userName}</p>
            </div>
        </div>
    );
};

export default Video;
