import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons";

const Room = () => {
    const dispatch = useAppDispatch();
    const [fullScreen, setFullScreen] = useState(false);

    const handleResize = () => {
        setFullScreen(!fullScreen);
        dispatch(toggleSidebar());
    };

    return (
        <div
            className={`rounded-l-xl flex flex-col rounded-b-none absolute bottom-0 z-50 right-0 ${
                fullScreen
                    ? "h-full w-full "
                    : "h-full w-full sm:h-1/2 sm:w-[500px] sm:max-h-1/2 sm:max-w-1/2"
            }  bg-primary-900`}
        >
            <VideoContainer />
            <RoomButtons />
            {/* resize button */}
            <div
                onClick={handleResize}
                className="bottom-2  hidden sm:flex absolute  text-white right-0 w-8 h-8    justify-center items-center cursor-pointer"
            >
                {fullScreen === false && <ArrowsPointingOutIcon width={20} />}
                {fullScreen && <ArrowsPointingInIcon width={20} />}
            </div>
        </div>
    );
};

export default Room;
