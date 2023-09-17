import React, { useRef, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import useOutsideClick from "../../../../hooks/useOutsideClick";

interface EmojiPickerProps {
    emojiPickerOpen: boolean;
    setEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleEmojiSelect: (emoji: any) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
    emojiPickerOpen,
    setEmojiPickerOpen,
    handleEmojiSelect,
}) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const wasIconClickedRef = useRef(false);

    useOutsideClick(emojiPickerRef, () => {
        if (!wasIconClickedRef.current) {
            setEmojiPickerOpen(false);
        }
    });

    return (
        <div className="relative">
            <div
                onMouseDown={() => {
                    wasIconClickedRef.current = true;
                }}
                onMouseUp={() => {
                    if (emojiPickerOpen && wasIconClickedRef.current) {
                        setEmojiPickerOpen(false);
                    } else if (!emojiPickerOpen) {
                        setEmojiPickerOpen(true);
                    }
                    wasIconClickedRef.current = false;
                }}
                className="text-text1 hover:text-text2 pl-1 p-2 relative cursor-pointer "
            >
                <FaceSmileIcon width={20} height={20} />
            </div>
            {emojiPickerOpen && (
                <div
                    ref={emojiPickerRef}
                    className="absolute -top-3 -left-10 -translate-y-[100%]"
                >
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        className="absolute top-0 -translate-y-[100%]"
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;
