import FriendsListItem from "./FriendsListItem";
import {
    Friend,
    OnlineUser,
    useGetFriendsQuery,
    useGetOnlineUsersQuery,
} from "../../../../redux/features/apis/friendApi";

const FriendsList = () => {
    const { data } = useGetFriendsQuery();
    const { data: onlineUsers } = useGetOnlineUsersQuery();
    console.log("friends: ", data);

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
        <div className="">
            <h4 className="text-textGray2 text-sm text-center w-full mt-3 font-semibold">
                PRIVATE MESSAGES
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {data &&
                    onlineUsers &&
                    friends(data, onlineUsers)?.map((friend) => (
                        <FriendsListItem key={friend._id} friend={friend} />
                    ))}
            </div>
        </div>
    );
};

export default FriendsList;
