import { IMessage } from "../../../../redux/features/slices/chatSlice";
import ImageMessage from "./Message/ImageMessage";
import FileMessage from "./Message/FileMessage";
import AudioMessage from "./Message/AudioMessage";

interface Props {
    message: IMessage;
}

const MessageContent = ({ message }: Props) => {
    if (!message.fileName) {
        return <p className="whitespace-pre-wrap">{message.content}</p>;
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
