import FriendsListItem from "./FriendsListItem";
import { useAppSelector } from "../../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../../redux/features/slices/friendSlice";
import AddFriendModal from "./AddFriendModal";
import { useState } from "react";

const FriendsList = () => {
    const { friends: allFriends, onlineUsers } = useAppSelector(
        (state) => state.friend
    );
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);

    // add online status to friends
    const friends = (friends: Friend[], onlineUsers: OnlineUser[]) => {
        return friends.map((friend) => {
            const isOnline = onlineUsers.find(
                (onlineUser) => onlineUser.userId === friend._id
            );
            return {
                ...friend,
                isOnline: isOnline ? true : false,
            };
        });
    };

    const noFriends = !allFriends || allFriends.length === 0;

    return (
        <div className="overflow-auto scrollbar flex-grow mb-1">
            <h4 className="text-text2  text-sm text-center w-full mt-3 font-semibold">
                PRIVATE MESSAGES
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {allFriends &&
                    onlineUsers &&
                    friends(allFriends, onlineUsers)?.map((friend) => (
                        <FriendsListItem key={friend._id} friend={friend} />
                    ))}
                {noFriends && (
                    <div className="text-text1 text-center text-sm">
                        No friends yet
                        <div className="px-4 mt-5">
                            <button
                                onClick={() => setShowAddFriendModal(true)}
                                className="inline-block  rounded bg-slate-500 px-8  py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-slate-500 active:bg-slate-600"
                            >
                                Add Friend
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showAddFriendModal && (
                <AddFriendModal close={() => setShowAddFriendModal(false)} />
            )}
        </div>
    );
};

export default FriendsList;
