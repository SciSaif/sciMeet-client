import React, { useRef, useState } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import { useAppSelector } from "../../../../redux/hooks";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useCreateGroupMutation } from "../../../../redux/features/apis/groupApi";

interface Props {
    close: () => void;
}

const NewGroupModal = ({ close }: Props) => {
    const friends = useAppSelector((state) => state.friend.friends);
    const [participants, setParticipants] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [groupName, setGroupName] = useState("");

    const [createGroup] = useCreateGroupMutation();

    const handleCreate = () => {
        if (participants.length === 0) {
            setError("You must add participants");
            return;
        }
        if (groupName === "") {
            setError("Group name cannot be empty");
            return;
        }

        createGroup({
            group_name: groupName,
            participants,
        });
        close();
    };

    return (
        <Modal
            close={close}
            closeIcon
            className="p-5 sm:p-10 w-full sm:w-fit sm:min-w-[400px]"
        >
            <div>
                <h2 className="font-semibold text-lg mb-2 ">New Group</h2>

                <h3 className="text-sm mb-2">Add Participants</h3>
            </div>

            <div className="mb-2">
                {friends?.length === 0 && (
                    <div>There are no friends to show</div>
                )}

                {friends?.length > 0 && (
                    <div>
                        {friends.map((friend) => (
                            <div
                                onClick={() => {
                                    setError("");
                                    if (participants.includes(friend._id)) {
                                        // remove
                                        setParticipants((prev) =>
                                            prev.filter(
                                                (id) => id !== friend._id
                                            )
                                        );
                                        return;
                                    }
                                    setParticipants((prev) => [
                                        ...prev,
                                        friend._id,
                                    ]);
                                }}
                                key={friend._id}
                                className="flex flex-row  py-1 hover:bg-black/10 cursor-pointer justify-between items-center"
                            >
                                <div className="flex flex-row gap-x-2  items-center">
                                    <img
                                        src={friend.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{friend.username}</span>
                                </div>
                                <div>
                                    {participants.includes(friend._id) && (
                                        <span className="text-green-500">
                                            <CheckCircleIcon
                                                width={20}
                                                height={20}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-2">
                <Input
                    onChange={(e) => {
                        setGroupName(e.target.value);
                    }}
                    value={groupName}
                    label="Group Name"
                    type="text"
                    required
                    className="border-slate-500 py-1 "
                />
            </div>

            {error.length > 0 ? (
                <div className="text-red-500 text-sm mb-2">{error}</div>
            ) : (
                <></>
            )}
            <div className="flex flex-col gap-y-4">
                <button
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                    onClick={handleCreate}
                >
                    <span className="font-bold ">Create Group</span>
                </button>
            </div>
        </Modal>
    );
};

export default NewGroupModal;
