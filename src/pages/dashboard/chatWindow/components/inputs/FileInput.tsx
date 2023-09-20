import React, { ChangeEvent, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";

interface FileInputProps {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ handleFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
            />
            <div
                className="text-text1 hover:text-text2 p-2 cursor-pointer"
                onClick={handleIconClick}
            >
                <PaperClipIcon width={20} height={20} />
            </div>
        </div>
    );
};

export default FileInput;
