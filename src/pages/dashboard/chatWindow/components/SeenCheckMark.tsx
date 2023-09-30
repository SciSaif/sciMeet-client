import React from "react";
import { IMessage } from "../../../../redux/features/slices/chatSlice";
import { CheckIcon } from "@heroicons/react/24/outline";

import { Fragment } from "react";
import Popover from "../../../../components/Popover";
import { toReadableDate } from "../../../../utils/dateFunctions";
interface Props {
    message: IMessage;
    userId?: string;
    seenByAll: boolean;
}

const SeenCheckMark = ({ message, userId, seenByAll }: Props) => {
    return (
        <div className="_checkMarkId min-w-[30px] w-[30px]  flex items-end ">
            {message.author._id === userId && (
                <Popover
                    popup={
                        <>
                            <div className="bg-primary-700 w-[250px] p-2 rounded-lg ">
                                <div className="text-sm flex flex-row justify-between">
                                    <span>Delivered </span>
                                    <span className="text-text3">
                                        {toReadableDate(message.date)}
                                    </span>
                                </div>
                                <div className="text-sm flex flex-row justify-between">
                                    <span>Seen </span>
                                    <span className="text-text3">
                                        {message.seenBy.length > 0
                                            ? toReadableDate(
                                                  message.seenBy[0].date
                                              )
                                            : "not seen"}
                                    </span>
                                </div>
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
