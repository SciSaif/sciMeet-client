import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import TextareaAutosize from "react-textarea-autosize";

import settings from "../../../../../utils/settings";
import { afterTabPress } from "../chatFunctions";
import FilesUpload from "./FilesUpload";
import { useTypingStatus } from "../../../../../hooks/useTypingStatus";

import FileInput from "./FileInput";
import EmojiPicker from "./EmojiPicker";
import AudioRecorder from "./AudioInput";
import { sendDirectMessage } from "../../../../../realtimeCommunication/socketHandlers/chat";

interface Props {
    messagesContainerRef: React.RefObject<HTMLDivElement>;
}

const InputMessage = ({ messagesContainerRef }: Props) => {
    const [message, setMessage] = useState("");
    const selectedChat = useAppSelector((state) => state.other.selectedChat);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if (selectedChat) {
            setMessage("");
            if (windowSize.current[0] > settings.md)
                textareaRef.current?.focus();
        }
    }, [selectedChat]);

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
        if (!selectedChat || !message || message.length === 0) return;
        if (e.nativeEvent.shiftKey) {
            // Shift + Enter: Create a new line
            setMessage((prevMessage) => prevMessage + "\n");
        } else {
            // Enter: Submit the form
            sendDirectMessage({
                content: message,
                conversation_id: selectedChat.conversation_id,
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

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectedChat) return;
        console.log(event.target.files);
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setFiles(files);
        }
    };

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const handleEmojiSelect = (emoji: any) => {
        console.log("en");

        if (textareaRef.current) {
            console.log("en2");
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const textBefore = message.substring(0, start);
            const textAfter = message.substring(end, message.length);
            console.log(textBefore + emoji.native + textAfter);

            setMessage(textBefore + emoji.native + textAfter);

            // Move the cursor after the inserted emoji
            setTimeout(() => {
                textareaRef.current!.selectionStart =
                    start + emoji.native.length;
                textareaRef.current!.selectionEnd = start + emoji.native.length;
            }, 100);
        }
    };

    return (
        <div className="pb-5    w-full  px-1 md:px-5">
            <div className="w-full h-auto  flex flex-row  items-center bg-primary-700 relative  rounded-xl">
                {/* Use the FileInput component */}
                <FileInput handleFileChange={handleFileChange} />

                {/* Use the EmojiPicker component */}
                <EmojiPicker
                    emojiPickerOpen={emojiPickerOpen}
                    setEmojiPickerOpen={setEmojiPickerOpen}
                    handleEmojiSelect={handleEmojiSelect}
                />

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
                        placeholder={`Message ${
                            selectedChat &&
                            ("username" in selectedChat
                                ? selectedChat.username
                                : "bot_name" in selectedChat
                                ? selectedChat.bot_name
                                : selectedChat.group_name)
                        }`}
                        onBlur={handleTypingStop}
                        rows={1}
                    />
                    <AudioRecorder />

                    <button
                        type="submit"
                        className="pl-2 pr-4 cursor-pointer text-text3 hover:text-text3 "
                    >
                        <PaperAirplaneIcon width={20} />
                    </button>
                </form>
            </div>

            {files && files.length > 0 && selectedChat && (
                <FilesUpload
                    messagesContainerRef={messagesContainerRef}
                    conversation_id={selectedChat.conversation_id}
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
