import { MicrophoneIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder";

const AudioInput = () => {
    const [audioRecorder, setAudioRecorder] = useState(false);

    return (
        <>
            <div
                onClick={() => setAudioRecorder(true)}
                className="text-text1 cursor-pointer px-1 h-full py-2 "
            >
                <MicrophoneIcon width={20} height={20} />
            </div>
            {audioRecorder && (
                <AudioRecorder
                    close={() => {
                        console.log("reached");
                        setAudioRecorder(false);
                    }}
                />
            )}
        </>
    );
};

export default AudioInput;
