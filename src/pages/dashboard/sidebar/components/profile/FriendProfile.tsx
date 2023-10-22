import React, { useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import PendingInvitationsList from "../PendingInvitationsList";
import AddFriendModal from "../AddFriendModal";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    useDeleteGroupMutation,
    useUpdateGroupMutation,
} from "../../../../../redux/features/apis/groupApi";

const FriendProfile = () => {
    const profile = useAppSelector((state) => state.other.profile);

    const friends = useAppSelector((state) => state.friend.friends);

    const friend = friends.filter((friend) => friend._id === profile.id)[0];

    // add current user to friendsInGroup
    const user = useAppSelector((state) => state.auth.user);

    const [deleteGroup] = useDeleteGroupMutation();

    return (
        <div className="w-full overflow-auto h-full scrollbar flex flex-col pt-10">
            <div className="w-full flex justify-center flex-col items-center">
                <img
                    className="h-44 w-44 "
                    src={friend?.avatar ? friend.avatar : "avatars/pikachu.png"}
                    alt="dp"
                />

                <div className="text-white/80 flex flex-row gap-x-2 items-center mt-2">
                    <div className="text-2xl">{friend.username}</div>
                </div>
                <p className="text-sm text-text">Friend</p>
            </div>

            {/* {isGroupAdmin && (
                <div className="bg-black/10 mt-3 px-5">
                    <div
                        onClick={() => deleteGroup(group._id)}
                        className="text-red-500 flex flex-row gap-2 py-2 cursor-pointer hover:text-red-600"
                    >
                        <TrashIcon width={20} />
                        Delete Group
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default FriendProfile;
