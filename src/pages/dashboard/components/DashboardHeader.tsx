import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import SettingsDropdown from "./SettingsDropdown";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
    toggle: () => void;
}

const DashboardHeader = ({ toggle }: Props) => {
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    return (
        <div className="fixed flex justify-between z-50 shadow-md h-14  w-full bg-secondaryDark">
            <div className="w-fit flex items-center">
                <div
                    onClick={toggle}
                    className="ml-4  w-fit flex  items-center text-gray-300 p-2 cursor-pointer"
                >
                    <Bars3Icon width={20} />
                </div>
                {selectedFriend !== undefined && (
                    <div>
                        <span className="text-textGray/25 mr-1 font-bold">
                            @
                        </span>
                        <span className="text-textGray font-bold">
                            {selectedFriend.username}
                        </span>
                    </div>
                )}
            </div>

            <div className="">
                <SettingsDropdown />
            </div>
        </div>
    );
};

export default DashboardHeader;
