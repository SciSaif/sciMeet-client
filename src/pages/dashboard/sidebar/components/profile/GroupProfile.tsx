import React, { useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import PendingInvitationsList from "../PendingInvitationsList";
import AddFriendModal from "../AddFriendModal";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    useDeleteGroupMutation,
    useUpdateGroupMutation,
} from "../../../../../redux/features/apis/groupApi";

const GroupProfile = () => {
    const profile = useAppSelector((state) => state.other.profile);
    const group = useAppSelector((state) => {
        return state.group.groups.find((group) => group._id === profile.id);
    });
    if (!group) return <></>;
    const friends = useAppSelector((state) => state.friend.friends);
    const participants = useAppSelector((state) => {
        return state.chat.conversations.find(
            (conversation) => conversation._id === group.conversation_id
        )?.participants;
    });

    let friendsInGroup = friends?.filter((friend) => {
        return participants?.includes(friend._id);
    });

    // add current user to friendsInGroup
    const user = useAppSelector((state) => state.auth.user);
    if (user) {
        friendsInGroup = [
            {
                _id: user._id,
                username: user.username || "user",
                isOnline: false,
                conversation_id: "",
                avatar: user.avatar,
            },
            ...friendsInGroup,
        ];
    }

    const isGroupAdmin = group.creator_id === user?._id;

    const [newGroupName, setNewGroupName] = useState(group.group_name || "");
    const [editNameMode, setEditNameMode] = useState(false);
    const [newGroupDescription, setNewGroupDescription] = useState(
        group.description || ""
    );
    const [editDescriptionMode, setEditDescriptionMode] = useState(false);

    const [deleteGroup] = useDeleteGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();

    return (
        <div className="w-full overflow-auto h-full scrollbar flex flex-col pt-10">
            <div className="w-full flex justify-center flex-col items-center">
                <img
                    className="h-44 w-44 "
                    src={group?.avatar ? group.avatar : "group.png"}
                    alt="dp"
                />

                <div className="text-white/80 flex flex-row gap-x-2 items-center mt-2">
                    {editNameMode ? (
                        <div className="flex flex-row gap-x-2 items-center">
                            <input
                                className="bg-transparent border-b border-white/50 focus:border-white/75 focus:outline-none"
                                value={newGroupName}
                                onChange={(e) =>
                                    setNewGroupName(e.target.value)
                                }
                            />
                            <div
                                onClick={() => {
                                    setEditNameMode(false);
                                    updateGroup({
                                        group_id: group._id,
                                        group_name: newGroupName,
                                    });
                                }}
                                className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                            >
                                <CheckIcon width={16} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-2xl">{group.group_name}</div>
                            {isGroupAdmin && (
                                <div
                                    onClick={() => {
                                        setEditNameMode(true);
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <PencilIcon width={16} />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <p className="text-sm text-text">Group</p>
            </div>
            <div className="bg-black/10 mt-3 px-5 py-2">
                <div className="text-text2  text-sm mb-2  w-full mt-3 font-semibold">
                    Description
                </div>
                {isGroupAdmin ? (
                    <div>
                        {" "}
                        {editDescriptionMode ? (
                            <div className="flex flex-row gap-x-2 text-text items-center">
                                <input
                                    className="bg-transparent border-b border-white/50 focus:border-white/75 focus:outline-none"
                                    value={newGroupDescription}
                                    onChange={(e) =>
                                        setNewGroupDescription(e.target.value)
                                    }
                                />
                                <div
                                    onClick={() => {
                                        setEditDescriptionMode(false);
                                        updateGroup({
                                            group_id: group._id,
                                            description: newGroupDescription,
                                        });
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <CheckIcon width={16} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row text-text gap-x-2 items-center">
                                <p
                                    onClick={() => {
                                        setEditDescriptionMode(true);
                                    }}
                                    className="text-text text-sm cursor-pointer"
                                >
                                    {group?.description
                                        ? group.description
                                        : "Click here to add a description"}
                                </p>
                                <div
                                    onClick={() => {
                                        setEditDescriptionMode(true);
                                    }}
                                    className="opacity-60 hover:opacity-100 cursor-pointer mt-1"
                                >
                                    <PencilIcon width={16} />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {" "}
                        <p className="text-text text-sm ">
                            {group?.description
                                ? group.description
                                : "No group description"}
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-5 px-5 bg-black/10 ">
                <h4 className="text-text2  text-sm mb-2  w-full mt-3 font-semibold">
                    Participants
                </h4>
                {friendsInGroup?.length > 0 && (
                    <div>
                        {friendsInGroup.map((friend) => (
                            <div
                                key={friend._id}
                                className="flex flex-row text-text py-1 hover:bg-black/10 cursor-pointer justify-between items-center"
                            >
                                <div className="flex flex-row gap-x-2  items-center">
                                    <img
                                        src={friend.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{friend.username}</span>
                                </div>
                                {group.creator_id === friend._id && (
                                    <div>Admin</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isGroupAdmin && (
                <div className="bg-black/10 mt-3 px-5">
                    <div
                        onClick={() => deleteGroup(group._id)}
                        className="text-red-500 flex flex-row gap-2 py-2 cursor-pointer hover:text-red-600"
                    >
                        <TrashIcon width={20} />
                        Delete Group
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupProfile;
