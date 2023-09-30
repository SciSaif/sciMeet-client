import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { toggleProfile } from "../../../../redux/features/slices/otherSlice";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PendingInvitationsList from "./PendingInvitationsList";
import AddFriendModal from "./AddFriendModal";

const ProfileBar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isProfileOpen = useAppSelector((state) => state.other.profileOpen);
    const dispatch = useAppDispatch();
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const invitations = useAppSelector((state) => state.friend.invitations);

    return (
        <div
            className={twMerge(
                `w-full     group    rounded-lg   flex flex-col overflow-hidden`,
                isProfileOpen ? "h-screen absolute top-0 bg-slate-800" : ""
            )}
        >
            <div
                onClick={() => dispatch(toggleProfile())}
                className="flex flex-row justify-between items-center px-2 bg-[#161f2c] py-2 gap-x-2 h-fit cursor-pointer   w-full "
            >
                {isProfileOpen && (
                    <div className="text-text h-10 items-center justify-center text-center w-full flex  ">
                        <div>Close profile</div>
                    </div>
                )}
                {!isProfileOpen && (
                    <>
                        <div className="flex flex-row items-center gap-x-2">
                            <div className="flex rounded-full relative group-hover:rotate-6">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={
                                        user?.avatar
                                            ? user.avatar
                                            : "avatars/pikachu.png"
                                    }
                                    alt="dp"
                                />
                                <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 ">
                                    <div className=" absolute rounded-full bottom-1/2 right-1/2 translate-x-1/2  translate-y-1/2 bg-green-500 h-[7px] w-[7px] "></div>
                                </div>
                            </div>
                            <div className="text-white/80">
                                <div>{user?.username}</div>
                                <div className="text-xs text-textGray">
                                    Online
                                </div>
                            </div>
                        </div>
                        {!isProfileOpen && invitations?.length !== 0 && (
                            <div className="pr-5">
                                <div className="rounded-full min-w-[24px] text-center text-xs text-white bg-primary-700 p-1">
                                    {invitations.length}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {isProfileOpen && (
                <div className="w-full  pt-10">
                    <div className="w-full flex justify-center flex-col items-center">
                        <img
                            className="h-44 w-44 rounded-full"
                            src={
                                user?.avatar
                                    ? user.avatar
                                    : "avatars/pikachu.png"
                            }
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
                    <div className="">
                        <PendingInvitationsList />
                    </div>
                </div>
            )}
            {showAddFriendModal && (
                <AddFriendModal close={() => setShowAddFriendModal(false)} />
            )}
        </div>
    );
};

export default ProfileBar;
