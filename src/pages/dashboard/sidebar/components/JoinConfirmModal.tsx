import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
    RoomDetails,
    setRoomDetails,
    setRoomState,
} from "../../../../redux/features/slices/roomSlice";
import { leaveRoomHandler } from "../../../../utils/roomUtils";
import { toggleSidebar } from "../../../../redux/features/slices/otherSlice";
import { getLocalStreamPreview } from "../../../../realtimeCommunication/webRTCHandler";

import settings from "../../../../utils/settings";
import { joinRoom } from "../../../../realtimeCommunication/socketHandlers/rooms";
const md = settings.md;

interface Props {
    close: () => void;
    participants: {
        avatar: string;
        username: string;
        _id: string;
    }[];
    room: RoomDetails;
}

const JoinConfirmModal = ({ close, participants, room }: Props) => {
    const windowWidth = useRef(window.innerWidth);
    const numberOfParticipants = room.participants.length;
    const dispatch = useAppDispatch();
    const currentRoomId = useAppSelector(
        (state) => state.room.roomDetails?.roomid
    );
    const handleJoin = () => {
        console.log("join confirm modal");

        if (currentRoomId === room.roomid) {
            close();
            return;
        }

        if (numberOfParticipants < 4) {
            // if user is already in a room, exit
            leaveRoomHandler();
            // console.log("l2", getCurrentTimeInMilliseconds());

            // join room
            const successCallbackFunc = () => {
                dispatch(setRoomDetails(room));
                dispatch(
                    setRoomState({
                        isUserInRoom: true,
                        isUserRoomCreator: false,
                    })
                );
                joinRoom(room.roomid);

                if (windowWidth.current < md) {
                    dispatch(toggleSidebar());
                }
                close();
            };

            getLocalStreamPreview(false, successCallbackFunc);
        }
    };
    if (!room.isGroup) {
        // If room.isGroup is true, just call the handleJoin function
        handleJoin();
        return null; // Don't render the modal
    }

    return (
        <Modal
            close={close}
            closeIcon
            className="p-4 w-full sm:w-fit sm:min-w-[300px]"
        >
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        {participants.length + " "} participant{" "}
                        {participants.length > 1 ? "s" : ""}
                    </div>
                    <div></div>
                </div>
                <div>
                    {participants.map((participant) => (
                        <div
                            key={participant._id}
                            className="flex flex-row gap-x-2 items-center"
                        >
                            <img
                                src={participant.avatar}
                                alt="avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>{participant.username}</span>
                        </div>
                    ))}
                </div>

                <button
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                    onClick={handleJoin}
                >
                    <span className="font-bold ">Join</span>
                </button>
            </div>
        </Modal>
    );
};

export default JoinConfirmModal;
