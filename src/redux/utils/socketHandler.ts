import { OnlineUser } from "./../features/slices/friendSlice";
import { auth } from "./../../../firebase-config";
import { Socket, io } from "socket.io-client";
import { RootState, store } from "../store";
import { MessageContent, MessageHistory } from "../features/apis/chatApi";
import {
    ActiveRoom,
    setActiveRooms,
    setRoomDetails,
} from "../features/slices/roomSlice";
import {
    Friend,
    Invitation,
    setFriends,
    setInvitations,
    setOnlineUsers,
} from "../features/slices/friendSlice";

interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    "friends-invitations": (data: { pendingInvitations: Invitation[] }) => void;
    "friends-list": (data: { friends: Friend[] }) => void;
    "online-users": (data: { onlineUsers: OnlineUser[] }) => void;
    "direct-chat-history": (data: MessageHistory) => void;
    "room-create": (data: any) => void;
    "active-rooms": (data: { activeRooms: ActiveRoom[] }) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    "direct-message": (data: MessageContent) => void;
    "direct-chat-history": (data: any) => void;
    "room-create": () => void;
    "join-room": (data: { roomid: string }) => void;
    "leave-room": (data: { roomid: string }) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function getSocket(getState: () => unknown) {
    let state = getState() as RootState;
    if (state.auth.user === null) return;
    const token = state.auth.user.token;
    if (!socket) {
        socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
            auth: {
                token,
            },
        });
    }
    return socket;
}

export function closeSocket() {
    if (socket) {
        socket.close();
        socket = undefined!;
    }
}

export const connectWithSocketServer = (getState: () => any, dispatch: any) => {
    const socket = getSocket(getState);
    if (!socket) return;
    socket.on("active-rooms", ({ activeRooms }) => {
        console.log("active-rooms", activeRooms);
        const friends = getState().friend.friends;
        const rooms = <ActiveRoom[]>[];
        // only add rooms that is created by friends
        activeRooms.forEach((room) => {
            friends.forEach((f: Friend) => {
                if (f._id === room.roomCreator.userId) {
                    room.roomCreator.username = f.username;
                    rooms.push({
                        ...room,
                    });
                }
            });
        });

        dispatch(setActiveRooms(rooms));
    });
    socket.on("room-create", (data) => {
        dispatch(setRoomDetails(data.roomDetails));
    });

    // friends
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

export const joinRoom = (roomid: string) => {
    socket.emit("join-room", { roomid });
};

export const leaveRoom = (roomid: string) => {
    socket.emit("leave-room", { roomid });
};
