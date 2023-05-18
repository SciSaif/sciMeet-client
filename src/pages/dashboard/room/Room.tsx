import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";

const Room = () => {
    const dispatch = useAppDispatch();
    const [fullScreen, setFullScreen] = useState(false);

    const handleResize = () => {
        setFullScreen(!fullScreen);
        dispatch(toggleSidebar());
    };

    return (
        <div
            className={`rounded-l-xl rounded-b-none absolute bottom-0 right-0 ${
                fullScreen
                    ? "h-full w-full "
                    : "h-full w-full sm:h-1/2 sm:w-[500px] sm:max-h-1/2 sm:max-w-1/2"
            }  bg-primaryDark`}
        >
            {/* resize button */}
            <div
                onClick={handleResize}
                className="bottom-0 hidden sm:flex absolute hover:bg-primaryAccentLighter text-white right-0 w-8 h-8 bg-gray-500 rounded-tl-xl  justify-center items-center cursor-pointer"
            >
                {fullScreen === false && <ArrowsPointingOutIcon width={20} />}
                {fullScreen && <ArrowsPointingInIcon width={20} />}
            </div>
        </div>
    );
};

export default Room;
