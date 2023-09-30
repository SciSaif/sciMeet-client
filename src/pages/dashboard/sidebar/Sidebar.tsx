import { useState } from "react";
import AddFriendModal from "./components/AddFriendModal";
import FriendsList from "./components/FriendsList";
import PendingInvitationsList from "./components/PendingInvitationsList";
import SidebarLeft from "./components/SidebarLeft";
import ProfileBar from "./components/ProfileBar";
import SettingsDropdown from "../components/SettingsDropdown";

const Sidebar = () => {
    return (
        <div
            className={` h-[100dvh] w-[calc(100%-60px)] md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            <SidebarLeft />
            <div className="bg-primary h-[100dvh] w-full rounded-lg mr-2  relative overflow-hidden">
                <div className=" h-full flex flex-col ">
                    <div className="w-full flex flex-row items-center justify-between pl-5 gap-3 text-center py-2 text-secondary font-bold text-2xl border-b border-slate-100/25">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src="logoTransparent.png"
                                alt="logo"
                                className="h-6 "
                            />
                            <span className="text-sm text-white">SciMeet</span>
                        </div>
                        <SettingsDropdown />
                    </div>
                    <FriendsList />
                    <ProfileBar />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
