import React from "react";

interface Props {
    message: {
        id: number;
        content: string;
        sameAuthor: string;
        username: string;
        date: string;
        sameDay: boolean;
    };
}

const Message = ({ message }: Props) => {
    return (
        <div className="text-textGray flex flex-row gap-x-3 ">
            <div className="flex rounded-full h-fit ">
                <img
                    className="h-8 w-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${message.username}&&background=16D162`}
                    alt=""
                />
            </div>
            <div className="flex flex-col  ">
                <div className="items-center flex">
                    <span className="text-textGray text-sm mr-1 font-bold">
                        {message.username}
                    </span>
                    <span className="text-textGray3/50 font-base text-xs font-bold">
                        {message.sameDay ? message.date : message.date}
                    </span>
                </div>
                <div className="flex flex-col">{message.content}</div>
            </div>
        </div>
    );
};

export default Message;
