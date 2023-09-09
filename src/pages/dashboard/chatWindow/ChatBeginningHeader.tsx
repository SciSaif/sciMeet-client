import React from "react";

interface Props {
    friend: {
        username: string;
        _id: string;
        avatar?: string;
    };
}

const ChatBeginningHeader = ({ friend }: Props) => {
    return (
        <div className="py-5 text-textGray">
            <div className="flex rounded-full w-fit">
                <img
                    className="h-24 w-24 rounded-full"
                    src={friend.avatar ? friend.avatar : "avatars/pikachu.png"}
                    alt=""
                />
            </div>
            <div className=" text-textGray font-bold text-3xl">
                {friend.username}
            </div>
            <p>
                This is the beginning of your converasation with{" "}
                {friend.username}
            </p>
        </div>
    );
};

export default ChatBeginningHeader;