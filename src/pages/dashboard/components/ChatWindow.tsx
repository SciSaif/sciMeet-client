import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";
import {
    useDirectMessageMutation,
    useGetMessageHistoryQuery,
} from "../../../redux/features/apis/chatApi";
import { isSameDay } from "../../../utils/dateFunctions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const ChatWindow = () => {
    const [message, setMessage] = useState("");
    const [sendDirectMessage] = useDirectMessageMutation();

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );
    const { data: messages } = useGetMessageHistoryQuery(
        {
            receiverUserId: selectedFriend?._id ? selectedFriend._id : "",
        },
        { skip: !selectedFriend?._id }
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFriend) return;
        setMessage("");
        sendDirectMessage({
            content: message,
            receiverUserId: selectedFriend._id,
        });
    };

    return (
        <main className="max-h-screen  pt-14 h-screen flex flex-col  justify-end   overflow-auto  scrollbar w-full    ">
            {selectedFriend === undefined && (
                <div className="flex w-full items-center justify-center h-full text-textGray font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {selectedFriend !== undefined && (
                <div className="flex flex-col-reverse   overflow-auto scrollbar px-5 ">
                    <div className=" flex flex-col pb-5">
                        {messages?.map((message, index) => {
                            const sameAuthor =
                                index > 0 &&
                                messages[index].author._id ===
                                    messages[index - 1].author._id;

                            const sameDay =
                                index > 0 &&
                                isSameDay(
                                    messages[index].date,
                                    messages[index - 1].date
                                );

                            return (
                                <Message
                                    key={message._id}
                                    message={message}
                                    mergeMessage={sameAuthor && sameDay}
                                />
                            );
                        })}
                    </div>
                    <ChatBeginningHeader friend={selectedFriend} />
                </div>
            )}
            {selectedFriend !== undefined && (
                <form onSubmit={handleSubmit} className="pb-5   w-full  px-5">
                    <div className="w-full  flex flex-row items-center bg-[#393A3A] rounded-xl">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder={`Message ${selectedFriend?.username}`}
                            className="w-full rounded-l-xl border-0 pr-10 bg-[#393A3A] focus:ring-0 placeholder:text-textGray/50 outline-none  active:outline-none text-textGray"
                        />
                        <button
                            type="submit"
                            className="pl-2 pr-4 cursor-pointer text-textGray hover:text-textGray3 "
                        >
                            <PaperAirplaneIcon width={20} />
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
};

export default ChatWindow;
