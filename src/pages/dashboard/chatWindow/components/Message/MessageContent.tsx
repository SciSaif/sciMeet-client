import { IMessage } from "../../../../../redux/features/slices/chatSlice";
import ImageMessage from "./ImageMessage";
import FileMessage from "./FileMessage";
import AudioMessage from "./AudioMessage";
import { InfoIcon } from "lucide-react";

interface Props {
    message: IMessage;
}

const MessageContent = ({ message }: Props) => {
    if (!message.fileName) {
        return (
            <p className="whitespace-pre-wrap">
                {message?.content ? (
                    message.content
                ) : message.isBot ? (
                    <span className="flex flex-row gap-2 items-center">
                        Ah! Sorry, I am getting rate limited{" "}
                        <InfoIcon size={16} className="text-red-500" />
                    </span>
                ) : (
                    ""
                )}
            </p>
        );
    }

    if (message.fileType === "image") {
        return <ImageMessage message={message} />;
    }

    if (message.fileType === "audio") {
        return <AudioMessage message={message} />;
    }

    return <FileMessage message={message} />;
};

export default MessageContent;
