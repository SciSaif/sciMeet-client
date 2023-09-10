import React from "react";
import { toReadableDate } from "../../../utils/dateFunctions";
import settings from "../../../utils/settings";
import {
    IConversation,
    IMessage,
} from "../../../redux/features/slices/chatSlice";
import { useAppSelector } from "../../../redux/hooks";
import { CheckIcon } from "@heroicons/react/24/outline";
import SeenCheckMark from "./components/SeenCheckMark";
const defaultImg = settings.defaultImg;

interface Props {
    message: IMessage;
    mergeMessage: boolean;
    totalParticipants: number;
}

const Message = ({ message, mergeMessage, totalParticipants }: Props) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <>
            {!mergeMessage && (
                <div className="text-text1 flex flex-row gap-x-3 mt-5">
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
                    <div className="flex flex-col  w-full">
                        <div className="items-center flex">
                            <span className="text-text1 text-sm mr-3 font-bold">
                                {message.author.username}
                            </span>
                            <span className="text-text3/50 font-base text-xs font-bold">
                                {toReadableDate(message.date)}
                            </span>
                            {/* {message.author._id === user?._id && (
                                <div className="text-text3/50 ml-2 font-base text-xs font-bold flex items-center justify-center">
                                    {message.seenBy.length ===
                                    totalParticipants - 1 ? (
                                        <div className="text-secondary translate-y-[3px]">
                                            <CheckIcon width={12} height={12} />
                                            <CheckIcon
                                                width={12}
                                                height={12}
                                                className="-translate-y-[7px] translate-x-[1px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-text2 translate-y-[1px]">
                                            <CheckIcon width={12} height={12} />
                                        </div>
                                    )}
                                </div>
                            )} */}
                        </div>
                        <div className="flex flex-row justify-between hover:bg-black/10">
                            <div>{message.content}</div>
                            <SeenCheckMark
                                message={message}
                                userId={user?._id}
                                seenByAll={
                                    message.seenBy.length ===
                                    totalParticipants - 1
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            {mergeMessage && (
                <div className="flex flex-row justify-between text-text1 ml-[47px]  hover:bg-black/10">
                    <div>{message.content}</div>
                    <SeenCheckMark
                        message={message}
                        userId={user?._id}
                        seenByAll={
                            message.seenBy.length === totalParticipants - 1
                        }
                    />
                </div>
            )}
        </>
    );
};

export default Message;
