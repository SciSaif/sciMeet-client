import { RootState, store } from "../redux/store";

// get friend by userId
export const getFriendById = (getState: () => RootState, userId: string) => {
    const friends = getState().friend.friends;
    const friend = friends.find((f) => f._id === userId);
    return friend;
};
