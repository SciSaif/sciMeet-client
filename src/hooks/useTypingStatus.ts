import { useEffect, useState } from "react";
import { IMessage } from "../redux/features/slices/chatSlice";
import { Friend } from "../redux/features/slices/friendSlice";
import { useAppSelector } from "../redux/hooks";
import { sendTypingStatus } from "../realtimeCommunication/socketHandlers/chat";

// useTypingStatus.js
export const useTypingStatus = (message: string) => {
    const [isTyping, setIsTyping] = useState(false);
    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const participants = useAppSelector((state) => {
        return selectedChat
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedChat.conversation_id
              )?.participants
            : [];
    });
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            if (isTyping) {
                handleTypingStop();
            }
        }, 2000);

        return () => {
            clearTimeout(typingTimeout);
        };
    }, [message]);

    const handleTypingStart = () => {
        if (!isTyping && selectedChat && participants) {
            sendTypingStatus({
                isTyping: true,
                conversation_id: selectedChat?.conversation_id,
                participantIds: participants,
            });
            setIsTyping(true);
        }
    };

    const handleTypingStop = () => {
        if (isTyping && selectedChat && participants) {
            sendTypingStatus({
                isTyping: false,
                conversation_id: selectedChat?.conversation_id,
                participantIds: participants,
            });
            setIsTyping(false);
        }
    };

    return { isTyping, setIsTyping, handleTypingStart, handleTypingStop };
};
