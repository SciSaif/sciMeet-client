import { useState } from "react";
import AddFriendModal from "./components/AddFriendModal";
import FriendsList from "./components/FriendsList";
import PendingInvitations from "./components/PendingInvitationsList";
import SidebarLeft from "./components/SidebarLeft";
import ProfileBar from "./components/ProfileBar";

const Sidebar = () => {
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);

    return (
        <div
            className={` h-[100dvh] w-[calc(100%-60px)] md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            <SidebarLeft />
            <div className="bg-primary h-[100dvh] w-full rounded-lg mr-2 pt-4">
                <div className=" h-full flex flex-col">
                    <div className="px-4">
                        <button
                            onClick={() => setShowAddFriendModal(true)}
                            className="inline-block  rounded bg-secondary px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-secondary active:bg-secondary-400"
                        >
                            Add Friend
                        </button>
                    </div>
                    <FriendsList />
                    <PendingInvitations />
                    <ProfileBar />
                </div>
            </div>

            {showAddFriendModal && (
                <AddFriendModal close={() => setShowAddFriendModal(false)} />
            )}
        </div>
    );
};

export default Sidebar;
