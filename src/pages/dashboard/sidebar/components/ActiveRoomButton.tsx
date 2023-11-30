import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import settings from "../../../../utils/settings";
import JoinConfirmModal from "./JoinConfirmModal";
import { toggleSidebar } from "../../../../redux/features/slices/otherSlice";
import { RoomDetails } from "../../../../redux/features/slices/roomSlice";
const defaultImg = settings.defaultImg;
const md = settings.md;
const colors = ["#67e8f9", "#5eead4", "#c4b5fd"];
// function to select a random color

const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};
interface Props {
    room: RoomDetails;
}

interface Participant {
    avatar: string;
    _id: string;
    username: string;
}

const ActiveRoomButton = ({ room }: Props) => {
    const windowWidth = useRef(window.innerWidth);
    const dispatch = useAppDispatch();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const friends = useAppSelector((state) => state.friend.friends);
    const user = useAppSelector((state) => state.auth.user);
    const currentRoomId = useAppSelector(
        (state) => state.room.roomDetails?.roomid
    );

    const [joinRoomModal, setJoinRoomModal] = useState(false);

    useEffect(() => {
        if ((friends && room.participants, user)) {
            const participants = room.participants.map((participant) => {
                const friend = friends.find(
                    (friend) => friend._id === participant.userId
                );

                return {
                    _id: friend?._id || user?._id || "0",
                    avatar: friend?.avatar || user?.avatar || defaultImg,
                    username: friend?.username || user.username || "unknown",
                };
            });

            setParticipants(participants);
        }
    }, [friends, room.participants, user]);

    return (
        <button
            onClick={() => {
                if (currentRoomId === room.roomid) {
                    if (windowWidth.current < md) {
                        dispatch(toggleSidebar());
                    }
                    return;
                }
                setJoinRoomModal(true);
            }}
            className="w-full h-16 overflow-hidden group text-4xl text-white bg-secondary hover:bg-secondary-600  rounded-2xl flex justify-center items-center"
        >
            <div
                className="grid grid-cols-2 text-sm w-full h-full p-2 gap-1 "
                style={{ backgroundColor: randomColor() }}
            >
                {participants?.map((participant) => {
                    return (
                        <div
                            key={participant._id}
                            className="w-full h-fit group-hover:rotate-6 group-hover:scale-105   transition"
                        >
                            <img
                                src={participant.avatar}
                                alt="friend"
                                className=""
                            />
                        </div>
                    );
                })}
            </div>

            {joinRoomModal && (
                <JoinConfirmModal
                    close={() => setJoinRoomModal(false)}
                    participants={participants}
                    room={room}
                />
            )}
        </button>
    );
};

export default ActiveRoomButton;
