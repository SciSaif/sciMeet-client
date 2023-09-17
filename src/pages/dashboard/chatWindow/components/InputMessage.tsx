import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
    sendDirectMessage,
    sendTypingStatus,
} from "../../../../realtimeCommunication/socketHandler";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import TextareaAutosize from "react-textarea-autosize";

import settings from "../../../../utils/settings";
import { afterTabPress } from "./chatFunctions";
import FilesUpload from "./FilesUpload";
import { useTypingStatus } from "../../../../hooks/useTypingStatus";

interface Props {
    messagesContainerRef: React.RefObject<HTMLDivElement>;
}

const InputMessage = ({ messagesContainerRef }: Props) => {
    const [message, setMessage] = useState("");
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if (selectedFriend) {
            setMessage("");
            if (windowSize.current[0] > settings.md)
                textareaRef.current?.focus();
        }
    }, [selectedFriend]);

    const { isTyping, setIsTyping, handleTypingStop, handleTypingStart } =
        useTypingStatus(message);

    // Use an effect to detect input changes and start/stop typing accordingly
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            if (isTyping) {
                handleTypingStop();
            }
        }, 2000); // Adjust the timeout as needed

        return () => {
            clearTimeout(typingTimeout);
        };
    }, [message]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!selectedFriend || !message || message.length === 0) return;
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
            setIsTyping(false);
            handleTypingStop();
            const messagesContainer = messagesContainerRef.current;
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        } else if (e.key === "Tab") {
            setMessage(afterTabPress(e));
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[] | null>(null);

    const handleIconClick = () => {
        fileInputRef.current?.click(); // Trigger the file input click event
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectedFriend) return;
        console.log(event.target.files);
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setFiles(files);
        }
    };

    return (
        <div className="pb-5   w-full  px-5">
            <div className="w-full h-auto  flex flex-row  items-center bg-primary-700  rounded-xl">
                {/* <EmojiPicker /> */}
                <div>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple
                    />

                    {/* Icon that triggers the file input */}
                    <div
                        className="text-text1 hover:text-text2 p-2 cursor-pointer"
                        onClick={handleIconClick}
                    >
                        <PaperClipIcon width={20} height={20} />
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-row  items-center w-full"
                >
                    <TextareaAutosize
                        ref={textareaRef}
                        // autoFocus
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            handleTypingStart();
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full  resize-none pl-1 rounded-l-xl border-0 pr-10 bg-transparent overflow-y-auto overflow-x-hidden  scrollbar max-h-[200px]  focus:ring-0 placeholder:text-text2/50 outline-none  active:outline-none text-text2"
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
                </form>
            </div>

            {files && files.length > 0 && selectedFriend && (
                <FilesUpload
                    messagesContainerRef={messagesContainerRef}
                    friend_id={selectedFriend?._id}
                    files={files}
                    close={() => {
                        setFiles(null);
                        // clear files from input 2
                        if (fileInputRef.current)
                            fileInputRef.current.value = "";
                    }}
                />
            )}
        </div>
    );
};

export default InputMessage;
