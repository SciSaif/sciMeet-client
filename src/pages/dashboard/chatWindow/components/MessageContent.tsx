import React, { useState } from "react";
import { IMessage } from "../../../../redux/features/slices/chatSlice";
import { twMerge } from "tailwind-merge";
import { downloadFile } from "../../../../utils/other";
import ImagePreview from "./ImagePreview";

interface Props {
    message: IMessage;
}

const MessageContent = ({ message }: Props) => {
    const [imagePreview, setImagePreview] = useState(false);
    if (!message.fileName)
        return <p className="whitespace-pre-wrap">{message.content}</p>;

    const fileExtension = message.fileName.split(".").pop()?.toLowerCase();

    const isPdf = fileExtension === "pdf";
    const isDocx = fileExtension === "docx";
    const isImage =
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"; // Add more image extensions if needed

    const renderFileContent = () => (
        <div
            onClick={() => downloadFile(message.file, message.fileName)}
            className={`rounded-xl my-2 items-center cursor-pointer bg-primary-700 flex flex-row gap-2 py-2 px-2 overflow-hidden w-[250px] ${
                message.content.length === 0 && "rounded-b-xl"
            }`}
        >
            {isPdf && <img className="w-10" src="pdf.png" alt="PDF" />}
            {isDocx && <img className="w-10" src="docx.png" alt="DOCX" />}
            {!isImage && !isPdf && !isDocx && (
                <img className="w-10" src="file.png" alt="file" />
            )}

            {message.fileName && (
                <p className="py-1 px-2">{message.fileName}</p>
            )}
        </div>
    );

    const renderImage = () => {
        return (
            <>
                <div
                    onClick={() => setImagePreview(true)}
                    className="rounded-xl cursor-pointer my-2 overflow-hidden w-[250px]"
                >
                    <img
                        className={twMerge(
                            "w-full border-4 rounded-t-xl border-primary-700 ",
                            message.content.length === 0 && "rounded-b-xl"
                        )}
                        src={message.file}
                        alt="file"
                    />
                    {message.content.length > 0 && (
                        <p className="bg-primary-700 py-1 rounded-b-xl px-2 whitespace-pre-wrap">
                            {message.content}
                        </p>
                    )}
                </div>
                {imagePreview === true && message.file && (
                    <ImagePreview
                        close={() => {
                            console.log("s");
                            setImagePreview(false);
                        }}
                        img={message.file || ""}
                        caption={message.content}
                    />
                )}
            </>
        );
    };
    if (isImage) {
        return renderImage();
    }

    return renderFileContent();
};

export default MessageContent;
