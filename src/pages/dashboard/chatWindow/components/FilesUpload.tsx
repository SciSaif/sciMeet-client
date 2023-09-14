import {
    DocumentIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { sendDirectMessage } from "../../../../realtimeCommunication/socketHandler";

interface Props {
    friend_id: string;
    files: File[];
    close: () => void;
}

function isImageFile(file: File) {
    return file.type.startsWith("image/");
}

function isPdfFile(file: File) {
    return file.type === "application/pdf";
}

const FilesUpload = ({ files, close, friend_id }: Props) => {
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
                });
            };

            reader.readAsArrayBuffer(file); // Read the file as binary data
        });
        close();
    };

    return (
        <div className="absolute flex flex-col top-0 pt-14 left-0 h-full w-full bg-primary text-white">
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
            <main className="flex-grow flex flex-col px-2 items-center ">
                <div className="flex-grow w-full   flex justify-center items-center ">
                    {/* main image */}
                    {isImageFile(files[selectedFileIndex]) ? (
                        <img
                            src={URL.createObjectURL(files[selectedFileIndex])}
                            alt={`Image ${selectedFileIndex}`}
                            className=" max-h-[300px] max-w-screen"
                        />
                    ) : isPdfFile(files[selectedFileIndex]) ? (
                        <img
                            src={"pdf2.png"}
                            alt={`Image ${selectedFileIndex}`}
                            className=" max-h-[300px] max-w-screen"
                        />
                    ) : (
                        <DocumentIcon
                            width={20}
                            height={20}
                            className=" max-h-[300px] max-w-screen"
                        />
                    )}
                </div>
                {files.length > 0 && (
                    <div className="  py-2 pt-4 px-2 max-w-full flex  gap-[2px] overflow-x-auto scrollbar overflow-y-hidden">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className={`mb-4 cursor-pointer  min-w-[50px] max-w-[50px] h-[50px] ${
                                    selectedFileIndex === index
                                        ? "border-2 border-secondary "
                                        : ""
                                }`}
                                onClick={() => setSelectedFileIndex(index)}
                            >
                                {isImageFile(file) ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Image ${index}`}
                                        className="w-full h-full "
                                    />
                                ) : isPdfFile(file) ? (
                                    <img
                                        src={"pdf2.png"}
                                        alt={`Image ${selectedFileIndex}`}
                                        className=" max-h-[300px] max-w-screen"
                                    />
                                ) : (
                                    <div>Unsupported file type</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="py-2 pb-5 px-2 flex flex-col gap-2">
                <input
                    type="text"
                    value={currentCaption}
                    onChange={(e) => {
                        setCurrentCaption(e.target.value);
                        setCaptions((prev) => {
                            const newCaptions = [...prev];
                            newCaptions[selectedFileIndex] = e.target.value;
                            return newCaptions;
                        });
                    }}
                    className="w-full  resize-none rounded-xl border-0 pr-10 bg-primary-700 overflow-y-auto overflow-x-hidden  scrollbar max-h-[200px]  focus:ring-0 placeholder:text-text2/50 outline-none  active:outline-none text-text2"
                    placeholder={`Add a caption...`}
                />
                <div className="flex justify-between items-center">
                    <div className="rounded-full bg-primary-700 px-4 py-1">
                        Send Files
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="pl-2 pr-4 hover:bg-secondary-600 bg-secondary p-3 rounded-full cursor-pointer text-white "
                        >
                            <PaperAirplaneIcon
                                width={20}
                                className="translate-x-[5px]"
                            />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FilesUpload;
