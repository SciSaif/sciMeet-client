import { useEffect, useState } from "react";
import { IMessage } from "../redux/features/slices/chatSlice";
import { Friend } from "../redux/features/slices/friendSlice";
import { useAppSelector } from "../redux/hooks";
import { sendTypingStatus } from "../realtimeCommunication/socketHandlers/chat";

// useTypingStatus.js
export const useTypingStatus = (message: string) => {
    const [isTyping, setIsTyping] = useState(false);
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const participants = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
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
        if (!isTyping && selectedFriend && participants) {
            sendTypingStatus({
                isTyping: true,
                conversationId: selectedFriend?.conversationId,
                participantIds: participants,
            });
            setIsTyping(true);
        }
    };

    const handleTypingStop = () => {
        if (isTyping && selectedFriend && participants) {
            sendTypingStatus({
                isTyping: false,
                conversationId: selectedFriend?.conversationId,
                participantIds: participants,
            });
            setIsTyping(false);
        }
    };

    return { isTyping, setIsTyping, handleTypingStart, handleTypingStop };
};
