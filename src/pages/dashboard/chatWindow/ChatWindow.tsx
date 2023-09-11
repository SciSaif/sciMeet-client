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
import { countUnreadMessages } from "../../../utils/unreadMessages";
import { markMessagesAsSeen } from "./utils";
import LoadMoreMessages from "./components/LoadMoreMessages";
import { IMessage } from "../../../redux/features/slices/chatSlice";

const ChatWindow = () => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const conversation = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
              )
            : null;
    });

    let messages: IMessage[] = [];
    if (conversation) {
        messages = conversation.messages;
    }

    useEffect(() => {
        if (selectedFriend && messages && messages.length === 0) {
            getChatHistory(selectedFriend._id);
        }
    }, [selectedFriend]);

    const {
        targetRef: latestMessageRef,
        isIntersecting: lastMessageIntersecting,
        setTargetRef,
    } = useIntersectionObserver({
        threshold: 1, // Adjust this threshold as needed
    });

    useEffect(() => {
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
        markMessagesAsSeen(
            lastMessageIntersecting,
            windowInFocus,
            conversation
        );
    }, [
        lastMessageIntersecting,
        conversation,
        latestMessageRef.current, // needed , dont remove
        windowInFocus,
    ]);

    let unreadMessages = countUnreadMessages(messages, true);

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
                        className="flex flex-col-reverse  relative  overflow-auto scrollbar px-5 "
                    >
                        {unreadMessages > 0 && (
                            <div
                                onClick={() => {
                                    // scroll to bottom
                                    const messagesContainer =
                                        messagesContainerRef.current;
                                    if (messagesContainer) {
                                        messagesContainer.scrollTop =
                                            messagesContainer.scrollHeight;
                                    }
                                }}
                                className="fixed top-20 text-sm cursor-pointer left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-text1 bg-primary-700"
                            >
                                You have new messages!
                            </div>
                        )}
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

                        <LoadMoreMessages messages={messages} />
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
