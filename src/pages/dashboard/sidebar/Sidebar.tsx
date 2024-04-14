import { useState } from "react";
import AddFriendModal from "./components/AddFriendModal";
import FriendsList from "./components/FriendsList";
import PendingInvitationsList from "./components/PendingInvitationsList";
import SidebarLeft from "./components/SidebarLeft";
import ProfileBar from "./components/profile/ProfileBar";
import SettingsDropdown from "../components/SettingsDropdown";
import GroupsLists from "./components/GroupsList";
import Profile from "./components/profile/Profile";
import { AtomIcon, MessageCircleIcon, UsersRoundIcon } from "lucide-react";
import Tab from "./components/Tab";

type Tabs = "friends" | "groups" | "AI";
const Sidebar = () => {
    const [selectedTab, setSelectedTab] = useState<Tabs>("friends");
    return (
        <div
            className={` w-[calc(100%-60px)] h-full md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            {/* <SidebarLeft /> */}
            <div className="bg-primary w-full rounded-lg mr-2  relative overflow-hidden">
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
                    {/* a div with three equal columns using grid */}
                    <div className="grid grid-cols-3 gap-2 h-10 mt-2 border-b border-slate-100/25">
                        <Tab
                            icon={<MessageCircleIcon size={24} />}
                            selected={selectedTab === "friends"}
                            onClick={() => setSelectedTab("friends")}
                        />
                        <Tab
                            icon={<UsersRoundIcon size={24} />}
                            selected={selectedTab === "groups"}
                            onClick={() => setSelectedTab("groups")}
                        />
                        <Tab
                            icon={<AtomIcon size={24} />}
                            selected={selectedTab === "AI"}
                            onClick={() => setSelectedTab("AI")}
                        />
                    </div>
                    {selectedTab === "friends" && <FriendsList />}
                    {selectedTab === "groups" && <GroupsLists />}
                    <ProfileBar />
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
