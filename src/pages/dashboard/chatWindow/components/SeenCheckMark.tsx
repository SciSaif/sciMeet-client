import React from "react";
import { IMessage } from "../../../../redux/features/slices/chatSlice";
import { CheckIcon } from "@heroicons/react/24/outline";

import { Fragment } from "react";
import Popover from "../../../../components/Popover";
import { toReadableDate } from "../../../../utils/dateFunctions";
import { store } from "../../../../redux/store";

export const getFriendById = (id: string) => {
    const friends = store.getState().friend.friends;
    return friends.find((friend) => friend._id === id);
};

interface Props {
    message: IMessage;
    userId?: string;
    seenByAll: boolean;
}

const SeenCheckMark = ({ message, userId, seenByAll }: Props) => {
    return (
        <div className="_checkMarkId min-w-[30px] w-[30px]   flex items-end ">
            {message.author._id === userId && (
                <Popover
                    popup={
                        <>
                            <div className="bg-primary-700 shadow   w-[250px] p-2 rounded-lg max-h-[150px] overflow-auto scrollbar">
                                <div className="text-sm border-b border-text/20 pb-1 flex flex-row justify-between">
                                    <span>Delivered </span>
                                    <span className="text-text3 text-xs">
                                        {toReadableDate(message.date)}
                                    </span>
                                </div>
                                {message.seenBy.length === 0 && (
                                    <div className="text-sm mt-1 flex flex-row justify-between">
                                        <span>Not Seen </span>
                                    </div>
                                )}

                                {message.seenBy.length >= 1 && (
                                    <div className="text-sm flex mt-1 flex-col justify-between">
                                        <div className="text-text1">
                                            Seen By
                                        </div>
                                        <div className="flex flex-col gap-1 pt-1">
                                            {message.seenBy.map((seenBy) => (
                                                <div
                                                    key={seenBy.userId}
                                                    className="flex flex-row items-center justify-between"
                                                >
                                                    <div className="flex flex-row items-center gap-x-2">
                                                        <img
                                                            src={
                                                                getFriendById(
                                                                    seenBy.userId
                                                                )?.avatar ||
                                                                "avatars/pikachu.png"
                                                            }
                                                            alt="avatar"
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <span className="text-text3 text-xs">
                                                            {
                                                                getFriendById(
                                                                    seenBy.userId
                                                                )?.username
                                                            }
                                                        </span>
                                                    </div>
                                                    <span className="text-text3 text-xs">
                                                        {toReadableDate(
                                                            seenBy.date
                                                        )}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    }
                >
                    <div className="text-text3/50 rounded-full  hover:bg-black/20   px-2 font-base text-xs font-bold flex items-center justify-center">
                        {seenByAll ? (
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
                </Popover>
            )}
        </div>
    );
};

export default SeenCheckMark;
