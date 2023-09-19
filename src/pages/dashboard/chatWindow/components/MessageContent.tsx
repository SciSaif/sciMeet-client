import { useState } from "react";
import { IMessage } from "../../../../redux/features/slices/chatSlice";
import { downloadFile } from "../../../../utils/other";
import fileTypes from "../../../../utils/fileTypes";
import ImageMessage from "./ImageMessage";
import FileMessage from "./FileMessage";

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

    return <FileMessage message={message} />;
};

export default MessageContent;
