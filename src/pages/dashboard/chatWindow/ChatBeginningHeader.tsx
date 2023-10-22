import React from "react";

interface Props {
    name: string;
    isGroup?: boolean;
    avatar?: string;
}

const ChatBeginningHeader = ({ name, isGroup, avatar }: Props) => {
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
            {isGroup ? (
                <p>
                    This is the beginning! Go ahead and claim the honor of being
                    the first to message.
                </p>
            ) : (
                <p>This is the beginning of your converasation with {name}</p>
            )}
        </div>
    );
};

export default ChatBeginningHeader;
