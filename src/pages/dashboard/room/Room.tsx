import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    setIsRoomFullScreen,
    toggleSidebar,
} from "../../../redux/features/slices/otherSlice";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons";

const Room = () => {
    const dispatch = useAppDispatch();
    // const [fullScreen, setFullScreen] = useState(true);
    const fullScreen = useAppSelector((state) => state.other.isRoomFullScreen);

    if (!fullScreen) return null;

    return (
        <div
            className={`rounded-l-xl flex flex-col rounded-b-none absolute bottom-0 z-50 right-0 h-full w-full bg-primary-900`}
        >
            <VideoContainer />
            <RoomButtons />

            <div
                onClick={() => {
                    dispatch(toggleSidebar());
                }}
                className="bottom-[5px]  sm:hidden flex absolute  text-white left-2 w-8 h-8    justify-center items-center cursor-pointer"
            >
                {/* {sidebarOpen === false && <ArrowRightIcon width={25} />} */}
                {/* {sidebarOpen && <ArrowLeftIcon width={25} />} */}
            </div>
        </div>
    );
};

export default Room;
