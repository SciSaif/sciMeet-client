import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import SettingsDropdown from "./SettingsDropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSidebar } from "../../../redux/features/slices/otherSlice";

const DashboardHeader = () => {
    const dispatch = useAppDispatch();

    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const onlineUsers = useAppSelector((state) => state.friend.onlineUsers);

    const isOnline = () => {
        if (selectedFriend) {
            return onlineUsers.find(
                (onlineUser) => onlineUser.userId === selectedFriend._id
            );
        }
        return false;
    };

    return (
        <div className="fixed flex justify-between z-50 shadow-md h-14  w-full bg-primary">
            <div className="w-fit flex items-center">
                <div
                    onClick={() => dispatch(toggleSidebar())}
                    className="ml-4  w-fit flex  items-center text-gray-300 p-2 cursor-pointer"
                >
                    <Bars3Icon width={20} />
                </div>
                {selectedFriend !== undefined && (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="flex rounded-full  relative group-hover:rotate-6">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={
                                    selectedFriend?.avatar
                                        ? selectedFriend.avatar
                                        : "avatars/pikachu.png"
                                }
                                alt="dp"
                            />
                            {isOnline() ? (
                                <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 ">
                                    <div className=" absolute rounded-full bottom-1/2 right-1/2 translate-x-1/2  translate-y-1/2 bg-green-500 h-[7px] w-[7px] "></div>
                                </div>
                            ) : (
                                <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 p-1">
                                    <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-gray-500 h-2 w-2 ">
                                        <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-primary h-1 w-1 "></div>
                                    </div>
                                </div>
                            )}
                        </div>
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
