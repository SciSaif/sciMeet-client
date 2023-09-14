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
                <div className="text-text1 flex flex-row gap-x-3 mt-5 ">
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
                        </div>
                        <div className="flex flex-row  justify-between hover:bg-black/10">
                            {message.file && message.file.length > 0 ? (
                                <div className=" rounded-lg my-2 overflow-hidden w-[250px]">
                                    <img
                                        className="w-full border-2 border-primary-700 "
                                        src={message.file}
                                        alt="file"
                                    />
                                    {message.content.length > 0 && (
                                        <p className=" bg-primary-700 py-1 rounded-b-lg px-2 whitespace-pre-wrap">
                                            {message.content}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="  whitespace-pre-wrap">
                                    {message.content}
                                </p>
                            )}

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
                <div className="flex flex-row justify-between  text-text1 ml-[47px]  hover:bg-black/10">
                    {message.file && message.file.length > 0 ? (
                        <div className=" rounded-lg my-2 overflow-hidden w-[250px]">
                            <img
                                className="w-full border-2 border-primary-700 "
                                src={message.file}
                                alt="file"
                            />
                            {message.content.length > 0 && (
                                <p className=" bg-primary-700 py-1 rounded-b-lg px-2 whitespace-pre-wrap">
                                    {message.content}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="  whitespace-pre-wrap">
                            {message.content}
                        </p>
                    )}
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
