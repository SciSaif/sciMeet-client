import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";
import { isSameDay } from "../../../utils/dateFunctions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
    getChatHistory,
    seenMessages,
    sendDirectMessage,
} from "../../../realtimeCommunication/socketHandler";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import InputMessage from "./components/InputMessage";
import TypingUsers from "./components/TypingUsers";
import useHasFocus from "../../../hooks/useHasFocus";

const ChatWindow = () => {
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const user = useAppSelector((state) => state.auth.user);

    const messages = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
              )?.messages
            : [];
    });
    const conversation = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
              )
            : null;
    });

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

    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0, // Adjust this threshold as needed
    });
    const {
        targetRef: latestMessageRef,
        isIntersecting: lastMessageIntersecting,
        setTargetRef,
    } = useIntersectionObserver({
        threshold: 1, // Adjust this threshold as needed
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

        // for detecting latest message and changing the latestMessageRef
        if (messages && messages.length > 0) {
            // change ref to the last message ( set it to a div with classname '_checkMarkId' inside the last child of messages)
            // we do this because we need to trigger it only if the whole message is visible horizontally
            let lastChild = messagesRef.current?.lastChild;
            if (lastChild) {
                // @ts-ignore
                let checkMarkId = lastChild.querySelector(
                    "._checkMarkId"
                ) as HTMLDivElement;
                if (checkMarkId) {
                    setTargetRef(checkMarkId);
                }
            }
        }
    }, [messages]);

    const windowInFocus = useHasFocus();

    useEffect(() => {
        if (isIntersecting && selectedFriend && !lastMessageId) {
            getMoreMessages();
        }
    }, [isIntersecting, selectedFriend]);

    useEffect(() => {
        if (!messages || messages.length === 0 || !user || !conversation) {
            return;
        }
        let lastMessage = messages[messages.length - 1];
        if (lastMessage.author._id === user._id) {
            return;
        }
        // check if last message is seen already or not
        let isSeen = false;
        for (let seenBy of lastMessage.seenBy) {
            if (seenBy.userId === user._id) {
                isSeen = true;
                break;
            }
        }
        if (lastMessageIntersecting && !isSeen && windowInFocus) {
            console.log("read all messages");

            seenMessages({ conversationId: conversation?._id });
        }
    }, [lastMessageIntersecting, latestMessageRef.current, windowInFocus]);

    return (
        <main className="max-h-[100dvh] chat-background pt-14 h-[100dvh] flex flex-col  justify-end  relative  overflow-auto  scrollbar w-full    ">
            {selectedFriend === undefined && (
                <div className="flex w-full items-center justify-center h-full text-text1 font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {selectedFriend !== undefined && (
                <>
                    <div
                        ref={messagesContainerRef}
                        className="flex flex-col-reverse   overflow-auto scrollbar px-5 "
                    >
                        <TypingUsers />
                        <div ref={messagesRef} className=" flex flex-col pb-5">
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
                                        totalParticipants={
                                            conversation?.participants.length ||
                                            0
                                        }
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
                                    className="w-full min-h-[100px]  flex flex-col justify-center items-center text-text1 font-semibold "
                                >
                                    <div className=" rounded-full  group-hover:rotate-6 animate-spin">
                                        <img
                                            className="h-10 w-10 rounded-full filter"
                                            src={"avatars/pikachu.png"}
                                            alt="loading"
                                        />
                                    </div>
                                    <div className="text-text1/50 text-sm">
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
