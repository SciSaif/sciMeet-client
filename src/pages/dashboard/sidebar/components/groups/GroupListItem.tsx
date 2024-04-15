import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    setSelectedChat,
    toggleSidebar,
} from "../../../../../redux/features/slices/otherSlice";
import { Friend } from "../../../../../redux/features/slices/friendSlice";
import { countUnreadMessages } from "../../../../../utils/unreadMessages";
import { Group } from "../../../../../redux/features/slices/groupSlice";

const GroupListItem = ({ group }: { group: Group }) => {
    const dispatch = useAppDispatch();
    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const user = useAppSelector((state) => state.auth.user);

    const messages = useAppSelector((state) => {
        return selectedChat
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedChat.conversation_id
              )?.messages
            : [];
    });

    let unreadMessages = countUnreadMessages(messages);

    const handleClick = () => {
        dispatch(setSelectedChat(group));
        // @Todo only toggle in mobile
        if (window.innerWidth < 768) dispatch(toggleSidebar());
    };

    return (
        <div
            onClick={handleClick}
            className={`w-full cursor-pointer items-center hover:bg-black/25 active:bg-black/50 select-none ${
                selectedChat?._id === group._id && "bg-black/25"
            } rounded-l-full  flex justify-between h-10`}
        >
            <div className="flex flex-row items-center gap-x-2">
                <div className="flex rounded-full relative">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={"group.png"}
                        alt="dp"
                    />
                    {/* {friend.isOnline ? (
                        <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 ">
                            <div className=" absolute rounded-full bottom-1/2 right-1/2 translate-x-1/2  translate-y-1/2 bg-green-500 h-[7px] w-[7px] "></div>
                        </div>
                    ) : (
                        <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 p-1">
                            <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-gray-500 h-2 w-2 ">
                                <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-primary h-1 w-1 "></div>
                            </div>
                        </div>
                    )} */}
                </div>
                <div className="text-text2">{group.group_name} </div>
            </div>
            {unreadMessages > 0 && (
                <div className="pr-5">
                    <div className="rounded-full min-w-[24px] text-center text-xs text-white bg-primary-700 p-1">
                        {unreadMessages}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupListItem;
