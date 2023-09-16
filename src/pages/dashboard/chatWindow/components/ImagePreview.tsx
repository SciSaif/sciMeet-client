import {
    DocumentIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { sendDirectMessage } from "../../../../realtimeCommunication/socketHandler";
import { twMerge } from "tailwind-merge";
import Modal from "../../../../components/Modal";

interface Props {
    close: () => void;
    img: string;
    caption?: string;
}

const ImagePreview = ({ close, img, caption }: Props) => {
    return (
        <Modal
            close={close}
            className="bg-black  flex flex-col h-screen w-full"
        >
            <header className="px-4 py-2 bg-black ">
                <button
                    type="button"
                    className="rounded-md p-2  text-text1 hover:text-text2 focus:outline-none"
                    onClick={() => close()}
                >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </header>
            <main className="p-4 flex flex-col bg-green-400 flex-grow items-center justify-center">
                <img src={img} alt="preview" className="object-scale-down  " />
                {caption && <p className="text-text1 mt-2">{caption}</p>}
            </main>
            <div className="h-1 bg-blue-500 w-full"></div>
        </Modal>
    );
};

export default ImagePreview;
