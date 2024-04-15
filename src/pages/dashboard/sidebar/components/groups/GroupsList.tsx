import FriendsListItem from "../friends/FriendsListItem";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../../redux/features/slices/friendSlice";
import GroupListItem from "./GroupListItem";

const GroupsLists = () => {
    const groups = useAppSelector((state) => state.group.groups);

    return (
        <div className="overflow-auto scrollbar flex-grow mb-5">
            <h4 className="text-text2  text-sm text-center w-full mt-1 font-semibold">
                Groups
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {groups?.map((group) => (
                    <GroupListItem key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default GroupsLists;
