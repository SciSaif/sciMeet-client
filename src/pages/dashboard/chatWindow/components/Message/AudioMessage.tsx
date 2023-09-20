import { useEffect, useRef, useState } from "react";
import { IMessage } from "../../../../../redux/features/slices/chatSlice";
import WaveSurfer from "wavesurfer.js";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { toMMSS } from "../../../../../utils/dateFunctions";

interface Props {
    message: IMessage;
}

const AudioMessage = ({ message }: Props) => {
    const waveformRef = useRef(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!message.file) return;
        let ws: WaveSurfer;
        if (waveformRef.current) {
            ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#14b8a6",
                progressColor: "#297068",
                cursorColor: "#14b8a6",
                barWidth: 1,
                barRadius: 3,
                cursorWidth: 2,
                height: 60,
                barHeight: 1,
                barGap: 3,
            });

            ws.load(message.file);

            ws.on("finish", () => setIsPlaying(false));
            ws.on("ready", () => setDuration(ws.getDuration()));
            ws.on("audioprocess", (time) => {
                setCurrentTime(time);
            });

            setWavesurfer(ws);
        }

        return () => {
            ws?.destroy();
        };
    }, [message]);

    const handlePlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    if (!message.file) return <></>;

    return (
        <div className="audio-message-container flex flex-col   max-w-[300px] w-full rounded-xl cursor-pointer my-2 overflow-hidden border-4 rounded-t-xl border-primary-700 bg-primary-700 ">
            <div className="flex flex-row items-center justify-center w-full h-full">
                <div
                    onClick={handlePlayPause}
                    className="px-2 h-full flex items-center"
                >
                    {isPlaying ? (
                        <PauseIcon width={20} height={20} />
                    ) : (
                        <PlayIcon width={20} height={20} />
                    )}
                </div>
                <div className="w-full">
                    <div ref={waveformRef} className=" w-full"></div>
                </div>
            </div>
            <div>
                <div className="text-xs flex flex-row justify-between pr-2 text-text1 ml-9">
                    <span>{toMMSS(currentTime)}</span>
                    <span>{toMMSS(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioMessage;
