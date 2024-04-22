import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChatBeginningHeader from "./ChatBeginningHeader";
import Message from "./Message";
import { isSameDay } from "../../../utils/dateFunctions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import InputMessage from "./components/inputs/InputMessage";
import TypingUsers from "./components/TypingUsers";
import useHasFocus from "../../../hooks/useHasFocus";
import { countUnreadMessages } from "../../../utils/unreadMessages";
import { markMessagesAsSeen, shouldMergeMessages } from "./utils";
import LoadMoreMessages from "./components/LoadMoreMessages";
import { IMessage } from "../../../redux/features/slices/chatSlice";
import { twMerge } from "tailwind-merge";
import FilesUpload from "./components/inputs/FilesUpload";
import useDragAndDrop from "../../../hooks/useDragDrop";
import { getChatHistory } from "../../../realtimeCommunication/socketHandlers/chat";
import { isBot, isGroup } from "../../../utils/other";
import BotSetup from "./components/BotSetup";

const ChatWindow = () => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const conversation = useAppSelector((state) => {
        return selectedChat
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedChat.conversation_id
              )
            : null;
    });

    const { isRoomFullScreen } = useAppSelector((state) => state.other);
    const isRoomOpen = useAppSelector((state) => state.room.isUserInRoom);

    let messages: IMessage[] = [];
    if (conversation) {
        messages = conversation.messages;
    }

    useEffect(() => {
        if (selectedChat && messages && messages.length === 0) {
            getChatHistory(selectedChat?.conversation_id);
        }
    }, [selectedChat]);

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
                if (lastMessageIntersecting) {
                    // scroll to bottom
                    const messagesContainer = messagesContainerRef.current;
                    if (messagesContainer) {
                        messagesContainer.scrollTop =
                            messagesContainer.scrollHeight;
                    }
                }
            }
        }
    }, [messages, lastMessageIntersecting, messagesContainerRef]);

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

    const {
        dragging,
        files,
        handleDragOver,
        handleDrop,
        mainRef,
        setFiles,
        handlePaste,
    } = useDragAndDrop();

    return (
        <main
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onPaste={handlePaste}
            ref={mainRef}
            className={twMerge(
                " h-full max-h-[100dvh]  min-h-[100dvh] chat-background pt-14  flex flex-col  justify-end  relative  overflow-auto  scrollbar w-full    ",
                isRoomOpen &&
                    !isRoomFullScreen &&
                    "max-h-[calc(100vh-30px)] min-h-[calc(100vh-30px)]"
            )}
        >
            {selectedChat === undefined && (
                <div className="flex w-full items-center justify-center h-screen text-text1 font-semibold">
                    To start chatting, select a friend from the sidebar
                </div>
            )}
            {dragging && selectedChat !== undefined && (
                <div className="w-full h-full absolute z-40 border-2 dashed border-secondary bg-black/10"></div>
            )}
            {selectedChat !== undefined && (
                <>
                    <div
                        ref={messagesContainerRef}
                        className="flex flex-col-reverse  relative  overflow-auto scrollbar px-1 md:px-5 "
                    >
                        {unreadMessages > 0 && !lastMessageIntersecting && (
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
                                className="fixed top-20 text-sm cursor-pointer left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-black bg-secondary"
                            >
                                You have new messages!
                            </div>
                        )}
                        <TypingUsers />
                        <div ref={messagesRef} className=" flex flex-col pb-5">
                            {messages?.map((message, index) => {
                                return (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        mergeMessage={shouldMergeMessages(
                                            index,
                                            messages
                                        )}
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
                                <>
                                    {!(
                                        isBot(selectedChat) &&
                                        messages.length === 0
                                    ) && <ChatBeginningHeader />}

                                    {isBot(selectedChat) &&
                                        messages.length === 0 && <BotSetup />}
                                </>
                            )}
                    </div>

                    {!(isBot(selectedChat) && messages.length === 0) && (
                        <InputMessage
                            messagesContainerRef={messagesContainerRef}
                            isBot={conversation?.isBot}
                        />
                    )}
                </>
            )}
            {files && files.length > 0 && selectedChat && (
                <FilesUpload
                    messagesContainerRef={messagesContainerRef}
                    conversation_id={selectedChat.conversation_id}
                    files={files}
                    close={() => {
                        setFiles(null);
                    }}
                />
            )}
        </main>
    );
};

export default ChatWindow;
