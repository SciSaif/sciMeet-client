import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
    sendDirectMessage,
    sendTypingStatus,
} from "../../../../realtimeCommunication/socketHandler";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IConversation } from "../../../../redux/features/slices/chatSlice";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
    messagesContainerRef: React.RefObject<HTMLDivElement>;
}

const InputMessage = ({ messagesContainerRef }: Props) => {
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState("");
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (selectedFriend) {
            setMessage("");
            textareaRef.current?.focus();
        }
    }, [selectedFriend]);

    const participants = useAppSelector((state) => {
        return selectedFriend
            ? state.chat.conversations.find(
                  (conversation) =>
                      conversation._id === selectedFriend.conversationId
              )?.participants
            : [];
    });

    // Use an effect to detect input changes and start/stop typing accordingly
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            handleTypingStop();
        }, 2000); // Adjust the timeout as needed

        return () => {
            clearTimeout(typingTimeout);
        };
    }, [message]);
    // Function to notify the server when the user starts typing
    const handleTypingStart = () => {
        if (!isTyping && selectedFriend && participants) {
            // startTyping(selectedFriend?._id); // You should define this function
            console.log("typing");
            sendTypingStatus({
                isTyping: true,
                conversationId: selectedFriend?.conversationId,
                participantIds: participants,
            });
            setIsTyping(true);
        }
    };

    // Function to notify the server when the user stops typing
    const handleTypingStop = (e?: any) => {
        if (isTyping && selectedFriend && participants) {
            // stopTyping(selectedFriend?._id); // You should define this function
            console.log("stopped typing");
            sendTypingStatus({
                isTyping: false,
                conversationId: selectedFriend?.conversationId,
                participantIds: participants,
            });
            setIsTyping(false);
        }
    };

    const handleSubmit = (e: any) => {
        // e.preventDefault();
        // if (!selectedFriend) return;
        // setMessage("");
        // sendDirectMessage({
        //     content: message,
        //     friend_id: selectedFriend._id,
        // });
        // const messagesContainer = messagesContainerRef.current;
        // if (messagesContainer) {
        //     messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // }

        e.preventDefault();
        if (!selectedFriend) return;
        if (e.nativeEvent.shiftKey) {
            // Shift + Enter: Create a new line
            setMessage((prevMessage) => prevMessage + "\n");
        } else {
            // Enter: Submit the form
            sendDirectMessage({
                content: message,
                friend_id: selectedFriend._id,
            });
            setMessage("");
            const messagesContainer = messagesContainerRef.current;
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pb-5   w-full  px-5">
            <div className="w-full h-auto  flex flex-row items-center bg-primary-700  rounded-xl">
                {/* <EmojiPicker /> */}

                <TextareaAutosize
                    ref={textareaRef}
                    autoFocus
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTypingStart();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                    className="w-full  resize-none rounded-l-xl border-0 pr-10 bg-transparent overflow-y-auto overflow-x-hidden  scrollbar max-h-[200px]  focus:ring-0 placeholder:text-text2/50 outline-none  active:outline-none text-text2"
                    placeholder={`Message ${selectedFriend?.username}`}
                    onBlur={handleTypingStop}
                    rows={1}
                />

                <button
                    type="submit"
                    className="pl-2 pr-4 cursor-pointer text-text3 hover:text-text3 "
                >
                    <PaperAirplaneIcon width={20} />
                </button>
            </div>
        </form>
    );
};

export default InputMessage;
