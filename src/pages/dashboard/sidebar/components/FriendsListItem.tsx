import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
    setSelectedFriend,
    toggleSidebar,
} from "../../../../redux/features/slices/otherSlice";
import { Friend } from "../../../../redux/features/slices/friendSlice";

const FriendsListItem = ({ friend }: { friend: Friend }) => {
    const dispatch = useAppDispatch();
    const selectedFriend = useAppSelector(
        (state) => state.other.selectedFriend
    );

    const handleClick = () => {
        dispatch(setSelectedFriend(friend));
        // @Todo only toggle in mobile
        if (window.innerWidth < 768) dispatch(toggleSidebar());
    };

    return (
        <div
            onClick={handleClick}
            className={`w-full cursor-pointer items-center hover:bg-black/25 active:bg-black/50 ${
                selectedFriend?._id === friend._id && "bg-black/25"
            } rounded-l-full  flex justify-between h-10`}
        >
            <div className="flex flex-row items-center gap-x-2">
                <div className="flex rounded-full relative">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={
                            friend.avatar
                                ? friend.avatar
                                : "avatars/pikachu.png"
                        }
                        alt="dp"
                    />
                    {friend.isOnline ? (
                        <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 ">
                            <div className=" absolute rounded-full bottom-1/2 right-1/2 translate-x-1/2  translate-y-1/2 bg-green-500 h-[7px] w-[7px] "></div>
                        </div>
                    ) : (
                        <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 p-1">
                            <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-gray-500 h-2 w-2 ">
                                <div className="rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2 bg-primary h-1 w-1 "></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-textGray2">{friend.username}</div>
            </div>
        </div>
    );
};

export default FriendsListItem;
