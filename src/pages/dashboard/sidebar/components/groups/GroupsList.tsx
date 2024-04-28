import FriendsListItem from "../friends/FriendsListItem";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../../redux/features/slices/friendSlice";
import GroupListItem from "./GroupListItem";
import { useState } from "react";
import NewGroupModal from "./NewGroupModal";

const GroupsLists = () => {
    const groups = useAppSelector((state) => state.group.groups);
    const noGroups = !groups || groups.length === 0;
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);

    return (
        <div className="overflow-auto scrollbar flex-grow mb-5">
            <h4 className="text-text2  text-sm text-center w-full mt-3 font-semibold">
                Groups
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {groups?.map((group) => (
                    <GroupListItem key={group._id} group={group} />
                ))}
                {noGroups && (
                    <div className="text-text1 text-center text-sm">
                        No groups yet
                        <div className="px-4 mt-5">
                            <button
                                onClick={() => setShowAddGroupModal(true)}
                                className="inline-block  rounded bg-slate-500 px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-slate-500 active:bg-slate-600"
                            >
                                Create group
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showAddGroupModal && (
                <NewGroupModal close={() => setShowAddGroupModal(false)} />
            )}
        </div>
    );
};

export default GroupsLists;
