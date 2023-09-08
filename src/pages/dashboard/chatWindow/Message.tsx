import React from "react";
import { toReadableDate } from "../../../utils/dateFunctions";
import settings from "../../../utils/settings";
import { IMessage } from "../../../redux/features/slices/chatSlice";
const defaultImg = settings.defaultImg;

interface Props {
    message: IMessage;
    mergeMessage: boolean;
}

const Message = ({ message, mergeMessage }: Props) => {
    return (
        <>
            {!mergeMessage && (
                <div className="text-textGray flex flex-row gap-x-3 mt-5">
                    <div className="flex rounded-full h-fit min-w-[35px] ">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={
                                message.author.avatar
                                    ? message.author.avatar
                                    : defaultImg
                            }
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col  ">
                        <div className="items-center flex">
                            <span className="text-textGray text-sm mr-3 font-bold">
                                {message.author.username}
                            </span>
                            <span className="text-textGray3/50 font-base text-xs font-bold">
                                {toReadableDate(message.date)}
                            </span>
                        </div>
                        <div className="flex flex-col">{message.content}</div>
                    </div>
                </div>
            )}

            {mergeMessage && (
                <div className="flex flex-col text-textGray ml-[47px]">
                    {message.content}
                </div>
            )}
        </>
    );
};

export default Message;
