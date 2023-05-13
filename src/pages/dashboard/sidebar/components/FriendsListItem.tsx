import React from "react";
import { Friend } from "../../../../redux/features/apis/friendApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
    setSelectedFriend,
    toggleChatOpen,
} from "../../../../redux/features/slices/otherSlice";

const FriendsListItem = ({ friend }: { friend: Friend }) => {
    const dispatch = useAppDispatch();
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const handleClick = () => {
        dispatch(
            setSelectedFriend({ _id: friend._id, username: friend.username })
        );
        dispatch(toggleChatOpen());
    };

    return (
        <div
            onClick={handleClick}
            className={`w-full cursor-pointer items-center hover:bg-black/25 active:bg-black/50 ${
                selectedFriend?._id === friend._id && "bg-black/25"
            } rounded-l-full  flex justify-between h-10`}
        >
            <div className="flex flex-row items-center gap-x-2">
                <div className="flex rounded-full ">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${friend.username}&&background=16D162`}
                        alt=""
                    />
                </div>
                <div className="text-textGray2">{friend.username}</div>
            </div>
            {friend.isOnline && (
                <div className="h-3 w-3 rounded-full mr-5 bg-green-500"></div>
            )}
        </div>
    );
};

export default FriendsListItem;
