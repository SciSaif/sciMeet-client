import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PendingInvitationsList from "../PendingInvitationsList";
import AddFriendModal from "../AddFriendModal";
import { setProfile } from "../../../../../redux/features/slices/otherSlice";

const ProfileBar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const profile = useAppSelector((state) => state.other.profile);

    const dispatch = useAppDispatch();
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const invitations = useAppSelector((state) => state.friend.invitations);

    return (
        <div
            className={twMerge(
                `w-full     group    rounded-lg   flex flex-col overflow-hidden`
            )}
        >
            <div
                onClick={() => dispatch(setProfile({ type: "personal" }))}
                className="flex flex-row justify-between items-center px-2 bg-[#161f2c] py-2 gap-x-2 h-fit cursor-pointer   w-full "
            >
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
                        <div className="text-xs text-textGray">Online</div>
                    </div>
                </div>
                {invitations?.length !== 0 && (
                    <div className="pr-5">
                        <div className="rounded-full min-w-[24px] text-center text-xs text-white bg-primary-700 p-1">
                            {invitations.length}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileBar;
