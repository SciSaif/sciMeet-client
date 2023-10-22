import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import SettingsDropdown from "./SettingsDropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    openSidebar,
    setProfile,
    toggleSidebar,
} from "../../../redux/features/slices/otherSlice";
import { Friend } from "../../../redux/features/slices/friendSlice";
import { isGroup } from "../../../utils/other";

const DashboardHeader = () => {
    const dispatch = useAppDispatch();

    const selectedChat = useAppSelector((state) => state.other.selectedChat);

    const onlineUsers = useAppSelector((state) => state.friend.onlineUsers);

    const isOnline = () => {
        if (selectedChat) {
            return onlineUsers.find(
                (onlineUser) => onlineUser.userId === selectedChat._id
            );
        }
        return false;
    };

    const openProfile = () => {
        if (!selectedChat) return;
        dispatch(
            setProfile({
                type: isGroup(selectedChat) ? "group" : "friend",
                id: selectedChat._id,
            })
        );
        dispatch(openSidebar());
    };

    return (
        <div className="fixed flex justify-between z-50 shadow-md h-14  w-full bg-primary">
            <div className="w-full  flex items-center">
                <div
                    onClick={() => dispatch(toggleSidebar())}
                    className="ml-4  w-fit  flex  items-center text-text1 p-2 cursor-pointer"
                >
                    <Bars3Icon width={20} />
                </div>
                {selectedChat !== undefined && (
                    <div
                        onClick={openProfile}
                        className="flex flex-row gap-2 h-full items-center cursor-pointer ml-1 pr-6 w-full"
                    >
                        <div className="flex rounded-full  relative group-hover:rotate-6 select-none">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={
                                    selectedChat?.avatar ||
                                    "avatars/pikachu.png"
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
                        <span className="text-text1 font-bold">
                            {isGroup(selectedChat)
                                ? selectedChat.group_name
                                : selectedChat.username}
                        </span>
                    </div>
                )}
            </div>

            {/* <div className="">
                <SettingsDropdown />
            </div> */}
        </div>
    );
};

export default DashboardHeader;
