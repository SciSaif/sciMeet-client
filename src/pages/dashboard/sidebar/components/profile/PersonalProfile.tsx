import React, { useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import PendingInvitationsList from "../PendingInvitationsList";
import AddFriendModal from "../AddFriendModal";

const PersonalProfile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    return (
        <div className="w-full h-full flex flex-col pt-10">
            <div className="w-full flex justify-center flex-col items-center">
                <img
                    className="h-44 w-44 "
                    src={user?.avatar ? user.avatar : "avatars/pikachu.png"}
                    alt="dp"
                />
                <div className="text-white/80">
                    <div className="text-2xl">{user?.username}</div>
                </div>
            </div>

            <div className="px-4 mt-5">
                <button
                    onClick={() => setShowAddFriendModal(true)}
                    className="inline-block  rounded bg-slate-500 px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-slate-500 active:bg-slate-600"
                >
                    Add Friend
                </button>
            </div>
            <div className="flex-grow ">
                <PendingInvitationsList />
            </div>
            {showAddFriendModal && (
                <AddFriendModal close={() => setShowAddFriendModal(false)} />
            )}
        </div>
    );
};

export default PersonalProfile;
