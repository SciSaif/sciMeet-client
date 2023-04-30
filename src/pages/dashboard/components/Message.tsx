import React from "react";
import { Message as MessageType } from "../../../redux/features/apis/chatApi";

interface Props {
    message: MessageType;
    sameAuthor: boolean;
}

const Message = ({ message, sameAuthor }: Props) => {
    return (
        <>
            {!sameAuthor && (
                <div className="text-textGray flex flex-row gap-x-3 mt-5">
                    <div className="flex rounded-full h-fit min-w-[35px] ">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${message.author.username}&&background=16D162`}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col  ">
                        <div className="items-center flex">
                            <span className="text-textGray text-sm mr-1 font-bold">
                                {message.author.username}
                            </span>
                            <span className="text-textGray3/50 font-base text-xs font-bold">
                                {/* {message.sameDay ? message.date : message.date} */}
                            </span>
                        </div>
                        <div className="flex flex-col">{message.content}</div>
                    </div>
                </div>
            )}

            {sameAuthor && (
                <div className="flex flex-col text-textGray ml-[47px]">
                    {message.content}
                </div>
            )}
        </>
    );
};

export default Message;
