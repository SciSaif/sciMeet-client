import { store } from "../../redux/store";

import { getSocket } from ".";
import {
    setFriends,
    setInvitations,
    setOnlineUsers,
} from "../../redux/features/slices/friendSlice";

export const connectWithSocketServer = () => {
    const socket = getSocket();
    if (!socket) return;
    const dispatch = store.dispatch;

    socket.on("friends-list", ({ friends }) => {
        dispatch(setFriends(friends));
    });
    socket.on("online-users", ({ onlineUsers }) => {
        dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("friends-invitations", ({ pendingInvitations }) => {
        dispatch(setInvitations(pendingInvitations));
    });
};
