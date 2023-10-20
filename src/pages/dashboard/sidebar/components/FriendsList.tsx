import FriendsListItem from "./FriendsListItem";
import { useAppSelector } from "../../../../redux/hooks";
import {
    Friend,
    OnlineUser,
} from "../../../../redux/features/slices/friendSlice";

const FriendsList = () => {
    const { friends: allFriends, onlineUsers } = useAppSelector(
        (state) => state.friend
    );

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
            </div>
        </div>
    );
};

export default FriendsList;
