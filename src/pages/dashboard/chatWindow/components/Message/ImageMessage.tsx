import React, { useState } from "react";
import ImagePreview from "../ImagePreview";
import { twMerge } from "tailwind-merge";
import { IMessage } from "../../../../../redux/features/slices/chatSlice";

interface Props {
    message: IMessage;
}

const ImageMessage = ({ message }: Props) => {
    const [imagePreview, setImagePreview] = useState(false);

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
                        setImagePreview(false);
                    }}
                    img={message.file || ""}
                    caption={message.content}
                />
            )}
        </>
    );
};

export default ImageMessage;
