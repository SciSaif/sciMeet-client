import {
    DocumentIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { sendDirectMessage } from "../../../../../realtimeCommunication/socketHandler";
import { twMerge } from "tailwind-merge";
import { getFileType } from "../../../../../utils/fileTypes";

interface Props {
    friend_id: string;
    files: File[];
    close: () => void;
    messagesContainerRef: React.RefObject<HTMLDivElement>;
}

// // Define a function to determine the file type
// function getFileType(file: File): string {
//     if (file.type.startsWith("image/")) {
//         return "image";
//     } else if (file.type === "application/pdf") {
//         return "pdf";
//     } else if (file.name.endsWith(".docx")) {
//         return "docx";
//     } else {
//         return "other";
//     }
// }

const FilesUpload = ({
    files,
    close,
    friend_id,
    messagesContainerRef,
}: Props) => {
    const [captions, setCaptions] = React.useState<string[]>([]);
    const [currentCaption, setCurrentCaption] = React.useState("");
    const [selectedFileIndex, setSelectedFileIndex] = React.useState(0);

    useEffect(() => {
        setCurrentCaption(captions[selectedFileIndex] || "");
    }, [selectedFileIndex]);

    const handleSubmit = () => {
        if (files.length === 0) return;

        files.forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = () => {
                const arrayBuffer = reader.result;
                sendDirectMessage({
                    friend_id,
                    content: captions[index] || "",
                    file: arrayBuffer,
                    fileName: file.name,
                    fileType: getFileType(file).identifier,
                });
            };

            reader.readAsArrayBuffer(file); // Read the file as binary data
        });
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        close();
    };

    const currentFileType = getFileType(files[selectedFileIndex]);

    return (
        <div className="absolute flex flex-col top-0 pt-14 z-10 left-0 h-full w-full bg-primary text-white">
            <header className="px-4 py-2">
                <button
                    type="button"
                    className="rounded-md p-2  text-text1 hover:text-text2 focus:outline-none"
                    onClick={() => close()}
                >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </header>
            <main className="flex-grow flex flex-col px-2 items-center">
                <div className="flex-grow flex flex-col w-full  justify-center items-center">
                    {/* Render content based on file type */}
                    {currentFileType.identifier === "image" ? (
                        <img
                            src={URL.createObjectURL(files[selectedFileIndex])}
                            alt={`Image ${selectedFileIndex}`}
                            className="max-h-[300px] max-w-screen"
                        />
                    ) : (
                        <img
                            src={currentFileType.icon}
                            alt={`${currentFileType.identifier} ${selectedFileIndex}`}
                            className="max-h-[300px] max-w-screen"
                        />
                    )}
                </div>
                {files.length > 0 && (
                    <div className="py-2 pt-4 px-2 max-w-full flex gap-[2px] overflow-x-auto scrollbar overflow-y-hidden">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className={`mb-4 cursor-pointer min-w-[50px] max-w-[50px] h-[50px] ${
                                    selectedFileIndex === index
                                        ? "border-2 border-secondary"
                                        : ""
                                }`}
                                onClick={() => setSelectedFileIndex(index)}
                            >
                                {/* Render content based on file type */}

                                {getFileType(file).identifier === "image" ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Image ${index}`}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <img
                                        src={getFileType(file).icon}
                                        alt={`${
                                            getFileType(file).identifier
                                        } ${index}`}
                                        className="max-h-[300px] max-w-screen"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <form
                onSubmit={handleSubmit}
                className="py-2 pb-5 px-2 flex flex-col gap-2"
            >
                <input
                    type="text"
                    value={currentCaption}
                    disabled={
                        getFileType(files[selectedFileIndex]).identifier !==
                        "image"
                    }
                    onChange={(e) => {
                        setCurrentCaption(e.target.value);
                        setCaptions((prev) => {
                            const newCaptions = [...prev];
                            newCaptions[selectedFileIndex] = e.target.value;
                            return newCaptions;
                        });
                    }}
                    className={twMerge(
                        "w-full resize-none rounded-xl border-0 pr-10 bg-primary-700 overflow-y-auto overflow-x-hidden scrollbar max-h-[200px] focus:ring-0 placeholder:text-text2/50 outline-none active:outline-none text-text2",
                        getFileType(files[selectedFileIndex]).identifier !==
                            "image" && "opacity-50"
                    )}
                    placeholder={`Add a caption...`}
                />
                <div className="flex justify-between items-center">
                    <div className="rounded-full bg-primary-700 px-4 py-1">
                        Send Files
                    </div>
                    <div>
                        <button
                            type="submit"
                            autoFocus
                            className="pl-2 pr-4 hover:bg-secondary-600 bg-secondary p-3 rounded-full cursor-pointer text-white"
                        >
                            <PaperAirplaneIcon
                                width={20}
                                className="translate-x-[5px]"
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FilesUpload;
