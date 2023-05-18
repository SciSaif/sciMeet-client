import { useState } from "react";
import AddFriendModal from "./components/AddFriendModal";
import FriendsList from "./components/FriendsList";
import PendingInvitations from "./components/PendingInvitationsList";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/20/solid";
import SidebarLeft from "./components/SidebarLeft";

const Sidebar = () => {
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);

    return (
        <div
            className={` h-screen w-[calc(100%-60px)] md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            <SidebarLeft />
            <div className="bg-secondaryDark h-screen w-full rounded-lg mr-2 py-4">
                <div className=" h-full grid grid-rows-[min-content_2fr_1fr]">
                    <div className="px-4">
                        <button
                            onClick={() => setShowAddFriendModal(true)}
                            className="inline-block  rounded bg-primaryAccent px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-primaryAccent active:bg-primaryAccentLighter"
                        >
                            Add Friend
                        </button>
                    </div>
                    <FriendsList />
                    <PendingInvitations />
                </div>
            </div>

            {showAddFriendModal && (
                <AddFriendModal close={() => setShowAddFriendModal(false)} />
            )}
        </div>
    );
};

export default Sidebar;
