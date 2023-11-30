import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { useSnackbar } from "notistack";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setRoomState } from "../../../redux/features/slices/roomSlice";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";
import { createRoom } from "../../../realtimeCommunication/socketHandlers/rooms";
import { getLocalStreamPreview } from "../../../realtimeCommunication/webRTCHandler";

const CallButtons = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const conversation = useAppSelector((state) => {
        return selectedChat
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedChat.conversation_id
              )
            : null;
    });
    const room = useAppSelector((state) => state.room);
    const handleAddRoom = (joinWithAudioOnly: boolean) => {
        const successCallbackFunc = () => {
            if (!conversation) return;
            // don't Let user Create a room if he is already in a room
            if (room.isUserInRoom) {
                enqueueSnackbar("Already in a room", {
                    variant: "info",
                });
                return;
            }

            dispatch(
                setRoomState({
                    isUserInRoom: true,
                    isUserRoomCreator: true,
                })
            );

            createRoom(
                conversation._id,
                conversation.participants,
                conversation.isGroup ? true : false
            );
        };

        getLocalStreamPreview(joinWithAudioOnly, successCallbackFunc);
    };

    return (
        <div className="h-full gap-x-2 pr-5 px-2 flex flex-row items-center text-text1">
            <div
                onClick={() => handleAddRoom(true)}
                className="hover:text-text-200 p-2 py-3 cursor-pointer"
            >
                <PhoneIcon width={20} />
            </div>
            <div
                onClick={() => handleAddRoom(false)}
                className="hover:text-text-200 p-2 py-3 cursor-pointer"
            >
                <VideoCameraIcon width={20} />
            </div>
        </div>
    );
};

export default CallButtons;
