import {
    PaperAirplaneIcon,
    PauseIcon,
    PlayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { sendDirectMessage } from "../../../../../realtimeCommunication/socketHandler";
import { useAppSelector } from "../../../../../redux/hooks";
import { toMMSS } from "../../../../../utils/dateFunctions";
import AudioWave from "../../../../../assets/AudioWave";

interface Props {
    close: () => void;
}

const AudioRecorder = ({ close }: Props) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    useEffect(() => {
        if (isRecording && !isPaused) {
            const interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRecording, isPaused]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const options = { mimeType: "audio/webm" };
            const recorder = new MediaRecorder(stream, options);
            console.log(recorder.mimeType);
            const chunks: Array<Blob> = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                setIsRecording(false);
                setElapsedTime(0);

                // Handle the recorded data, e.g., send it to a server
                const audioBlob = new Blob(chunks, { type: "audio/webm" });
                const url = URL.createObjectURL(audioBlob);

                if (selectedFriend) {
                    console.log("size of file", audioBlob.size);
                    sendDirectMessage({
                        friend_id: selectedFriend._id,
                        content: "",
                        file: audioBlob,
                        fileType: "audio",
                    });
                    // stop the stream
                    stream.getTracks().forEach((track) => track.stop());
                    // stop using microphone
                    stream.getAudioTracks()[0].stop();

                    close();
                }
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    useEffect(() => {
        startRecording();
    }, []);

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder) {
            if (isPaused) {
                mediaRecorder.resume();
            } else {
                mediaRecorder.pause();
            }
            setIsPaused(!isPaused);
        }
    };

    return (
        <div className="absolute text-text1 py-1 top-0 gap-3 left-0 w-full h-full flex items-center flex-row justify-center bg-primary-700">
            <div
                onClick={() => close()}
                className="p-2 rounded-lg hover:bg-black/10 cursor-pointer"
            >
                <TrashIcon width={20} height={20} />
            </div>
            {isRecording && (
                <>
                    <span
                        className={`dot ${
                            isRecording && !isPaused
                                ? "h-2 w-2 bg-red-500 rounded-full  animate-[ping_0.5s_linear_infinite]"
                                : ""
                        }`}
                    ></span>
                    <div className="flex items-center gap-2 px-2 ">
                        <span>{toMMSS(elapsedTime)}</span>
                    </div>
                    <AudioWave />
                    <button
                        className="p-2  rounded-lg hover:bg-black/10 cursor-pointer"
                        onClick={pauseRecording}
                    >
                        {isPaused ? (
                            <PlayIcon width={20} height={20} />
                        ) : (
                            <PauseIcon width={20} height={20} />
                        )}
                    </button>
                    <button
                        onClick={stopRecording}
                        className="p-2 cursor-pointer bg-secondary hover:bg-secondary-600  rounded-lg  text-white "
                    >
                        <PaperAirplaneIcon width={20} />
                    </button>
                </>
            )}
        </div>
    );
};

export default AudioRecorder;
