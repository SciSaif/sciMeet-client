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
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import InputMessage from "./components/InputMessage";

const ChatWindow = () => {
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
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

    const typingUserIds = useAppSelector((state) => {
        return (
            state.chat.typingStatus.find(
                (status) =>
                    status.conversationId === selectedFriend?.conversationId
            )?.typingUsers || []
        );
    });

    const friends = useAppSelector((state) => state.friend.friends);

    useEffect(() => {
        // get the usernames of typing users using userids in friends
        const newTypingUsers = typingUserIds.map((userId) => {
            const friend = friends.find((f) => f._id === userId);
            return friend?.username || userId;
        });
        if (typingUsers.length === 0 && newTypingUsers.length === 0) {
            return;
        }

        setTypingUsers(newTypingUsers);
    }, [typingUserIds, friends]);

    useEffect(() => {
        if (selectedFriend && !messages) {
            getChatHistory(selectedFriend._id);
        }
    }, [selectedFriend]);

    const getMoreMessages = () => {
        if (selectedFriend && messages && messages.length > 0) {
            setLastMessageId(messages[0]._id);
            getChatHistory(selectedFriend._id, messages[0]._id);
        }
    };

    const targetRef = useRef<HTMLDivElement | null>(null); // Specify the type explicitly

    const { isIntersecting } = useIntersectionObserver(targetRef, {
        threshold: 0, // Adjust this threshold as needed
    });

    useEffect(() => {
        // this is to prevent fetching more messages while more messages are being fetched
        if (
            messages &&
            messages.length > 0 &&
            messages[0]._id !== lastMessageId
        ) {
            setLastMessageId(null);
        }
    }, [messages]);

    useEffect(() => {
        if (isIntersecting && selectedFriend && !lastMessageId) {
            getMoreMessages();
        }
    }, [isIntersecting, selectedFriend]);

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
                        {typingUsers?.length > 0 && (
                            <div>
                                <p className="text-textGray text-sm py-2 px-3">
                                    {typingUsers.join(", ") +
                                        (typingUsers.length > 1
                                            ? " are "
                                            : " is ")}{" "}
                                    {"typing"}
                                </p>
                            </div>
                        )}
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
                        {messages &&
                            messages.length > 0 &&
                            !messages[0]?.firstMessage && (
                                <div
                                    ref={targetRef}
                                    onClick={getMoreMessages}
                                    className="w-full min-h-[100px]  flex flex-col justify-center items-center text-textGray font-semibold "
                                >
                                    <div className=" rounded-full  group-hover:rotate-6 animate-spin">
                                        <img
                                            className="h-10 w-10 rounded-full filter"
                                            src={"avatars/pikachu.png"}
                                            alt="loading"
                                        />
                                    </div>
                                    <div className="text-textGray/50 text-sm">
                                        Loading more messages
                                    </div>
                                </div>
                            )}
                        {messages &&
                            (messages.length == 0 ||
                                messages[0]?.firstMessage) && (
                                <ChatBeginningHeader friend={selectedFriend} />
                            )}
                    </div>

                    <InputMessage messagesContainerRef={messagesContainerRef} />
                </>
            )}
        </main>
    );
};

export default ChatWindow;
