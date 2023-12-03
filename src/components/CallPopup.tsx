import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { PhoneIcon } from "@heroicons/react/24/solid";
import JoinConfirmModal from "../pages/dashboard/sidebar/components/JoinConfirmModal";
import {
    ignoreCall,
    rejectCall,
} from "../realtimeCommunication/socketHandlers/rooms";
import settings from "../utils/settings";
import { Group } from "../redux/features/slices/groupSlice";

interface Participant {
    avatar: string;
    _id: string;
    username: string;
}
const defaultImg = settings.defaultImg;

const CallPopup = () => {
    const [joinRoomModal, setJoinRoomModal] = useState(false);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [group, setGroup] = useState<Group>(); //
    const { isUserInRoom, roomDetails } = useAppSelector((state) => state.room);
    const [avatar, setAvatar] = useState<string>("");

    const user = useAppSelector((state) => state.auth.user);
    const activeRooms = useAppSelector((state) => state.room.activeRooms);
    const groups = useAppSelector((state) => state.group.groups);

    const callRoom = activeRooms.filter(
        (room) =>
            room.roomCreator.userId !== user?._id &&
            !room.ignoredBy?.includes(user?._id || "0")
    )[0];

    const friends = useAppSelector((state) => state.friend.friends);
    const room = callRoom;

    useEffect(() => {
        if (
            friends &&
            room?.participants &&
            room.participants.length > 0 &&
            user &&
            groups
        ) {
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

            // if its not a group call
            if (!room.isGroup) {
                // find the avatar of the friend
                const friend = friends.find(
                    (friend) => friend._id === callRoom?.roomCreator.userId
                );
                setAvatar(friend?.avatar || defaultImg);
            } else {
                const conversation_id = room.conversation_id;
                const group = groups.find(
                    (group) => group.conversation_id === conversation_id
                );
                setAvatar(group?.avatar || defaultImg);
                setGroup(group);
            }
        }
    }, [friends, room, user, groups]);
    if (!callRoom || isUserInRoom) return null;

    const isGroup = room.isGroup;

    return (
        <div className="absolute z-50 top-2 shadow-xl flex flex-row max-w-screen  min-w-[350px] justify-between items-center -translate-x-1/2   left-1/2 h-[70px] rounded-full bg-primary-900 border-gray-800 border p-1 px-3">
            <div className="flex flex-row gap-2 items-center">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />
                <p className="text-white">
                    {isGroup
                        ? group?.group_name + " group call"
                        : callRoom.roomCreator.username + " is Calling"}{" "}
                </p>
            </div>
            <div className="flex flex-row gap-x-2">
                <button
                    onClick={() => setJoinRoomModal(true)}
                    className="rounded-full no_highlights outline-none active:outline-none p-2 h-10 w-10 text-white bg-green-400 hover:bg-green-500"
                >
                    <PhoneIcon
                        width={20}
                        className="translate-x-[1px] translate-y-[1px] "
                    />
                </button>
                <button
                    onClick={() => {
                        if (isGroup) ignoreCall(room.roomid);
                        else rejectCall(callRoom.roomid);
                    }}
                    className="rounded-full no_highlights outline-none active:outline-none text-white p-2 h-10 w-10 bg-red-400 hover:bg-red-500 rotate-[135deg]"
                >
                    <PhoneIcon
                        width={20}
                        className="translate-x-[3px] translate-y-[-1px] "
                    />
                </button>
            </div>
            {joinRoomModal && (
                <JoinConfirmModal
                    close={() => setJoinRoomModal(false)}
                    participants={participants}
                    room={room}
                />
            )}
        </div>
    );
};

export default CallPopup;
