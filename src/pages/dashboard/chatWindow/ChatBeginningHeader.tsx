import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { isBot, isGroup } from "../../../utils/other";

interface Props {
    name: string;
    isGroup?: boolean;
    isBot?: boolean;
    avatar?: string;
}

const ChatBeginningHeader = () => {
    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const name = isGroup(selectedChat)
        ? selectedChat?.group_name
        : isBot(selectedChat)
        ? selectedChat?.bot_name
        : selectedChat?.username;

    const avatar = selectedChat?.avatar;

    return (
        <div className="py-5 px-1 text-text1">
            <div className="flex rounded-full w-fit">
                <img
                    className="h-24 w-24 rounded-full"
                    src={avatar ? avatar : "avatars/pikachu.png"}
                    alt=""
                />
            </div>
            <div className=" text-text1 font-bold text-3xl">{name}</div>
            {isGroup(selectedChat) ? (
                <p>This is the beginning of the group</p>
            ) : (
                <p>This is the beginning of your converasation with {name}</p>
            )}
        </div>
    );
};

export default ChatBeginningHeader;
