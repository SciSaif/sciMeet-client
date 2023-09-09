import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";
import { isSameDay } from "../../../utils/dateFunctions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
    getChatHistory,
    sendDirectMessage,
} from "../../../realtimeCommunication/socketHandler";

const ChatWindow = () => {
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const messages = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
              )?.messages
            : [];
    });

    useEffect(() => {
        if (selectedFriend) {
            getChatHistory(selectedFriend._id);
        }
    }, [selectedFriend]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFriend) return;
        setMessage("");
        sendDirectMessage({
            content: message,
            friend_id: selectedFriend._id,
        });
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const getMoreMessages = () => {
        if (selectedFriend && messages) {
            getChatHistory(selectedFriend._id, messages[0]._id);
        }
    };

    // const lastPostObserver = useIntersectionObserver({type: "blogs", isSuccess, isFetching, hasMore: data?.hasMore});

    return (
        <main className="max-h-[100dvh]  pt-14 h-[100dvh] flex flex-col  justify-end   overflow-auto  scrollbar w-full    ">
            {selectedFriend === undefined && (
                <div className="flex w-full items-center justify-center h-full text-textGray font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {selectedFriend !== undefined && (
                <>
                    <div
                        ref={messagesContainerRef}
                        className="flex flex-col-reverse   overflow-auto scrollbar px-5 "
                    >
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
                        {messages && (
                            <div
                                onClick={getMoreMessages}
                                className="w-full min-h-[100px]  flex justify-center items-center text-textGray font-semibold "
                            >
                                Loading More...
                            </div>
                        )}
                        {messages && messages[0]?.firstMessage && (
                            <ChatBeginningHeader friend={selectedFriend} />
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="pb-5   w-full  px-5"
                    >
                        <div className="w-full  flex flex-row items-center bg-primary-700 rounded-xl">
                            {/* <EmojiPicker /> */}

                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                placeholder={`Message ${selectedFriend?.username}`}
                                className="w-full rounded-l-xl border-0 pr-10 bg-primary-700 focus:ring-0 placeholder:text-textGray/50 outline-none  active:outline-none text-textGray"
                            />

                            <button
                                type="submit"
                                className="pl-2 pr-4 cursor-pointer text-textGray hover:text-textGray3 "
                            >
                                <PaperAirplaneIcon width={20} />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </main>
    );
};

export default ChatWindow;
