import {
    PaperAirplaneIcon,
    PauseIcon,
    PlayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { toMMSS } from "../../../../../utils/dateFunctions";
import AudioWave from "../../../../../assets/AudioWave";
import { sendDirectMessage } from "../../../../../realtimeCommunication/socketHandlers/chat";

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
    const isCancelledRef = useRef(false); // Using useRef instead of useState

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
            const chunks: Array<Blob> = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                setIsRecording(false);
                setElapsedTime(0);

                if (isCancelledRef.current) {
                    // If it was cancelled, reset isCancelledRef and just return without uploading
                    isCancelledRef.current = false;
                    return;
                }

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
            if (mediaRecorder.stream) {
                const tracks = mediaRecorder.stream.getTracks();
                tracks.forEach((track) => track.stop());
                // Alternatively, you can close the entire MediaStream:
                mediaRecorder.stream
                    .getTracks()
                    .forEach((track) => track.stop());
            }
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

    const cancelRecording = () => {
        isCancelledRef.current = true; // Set isCancelledRef.current to true when cancelling
        stopRecording(); // Stop the recording after setting isCancelledRef.current
        close(); // Close the recorder
    };

    return (
        <div className="absolute text-text1 py-1 top-0 gap-3 left-0 w-full h-full flex items-center flex-row justify-center rounded-xl bg-primary-700">
            <div
                onClick={cancelRecording}
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
                                : "h-2 w-2"
                        }`}
                    ></span>
                    <div className="flex items-center gap-2 px-2 ">
                        <span>{toMMSS(elapsedTime)}</span>
                    </div>
                    {isRecording && !isPaused && <AudioWave />}
                    {isRecording && isPaused && (
                        <div className="">
                            <div className="h-[2px] w-[62px]  bg-text"></div>
                        </div>
                    )}
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
