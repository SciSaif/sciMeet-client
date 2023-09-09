import { OnlineUser } from "../redux/features/slices/friendSlice";
import { auth } from "../../firebase-config";
import { Socket, io } from "socket.io-client";
import { RootState, store } from "../redux/store";
import {
    ActiveRoom,
    setActiveRooms,
    setRoomDetails,
} from "../redux/features/slices/roomSlice";
import {
    Friend,
    Invitation,
    setFriends,
    setInvitations,
    setOnlineUsers,
} from "../redux/features/slices/friendSlice";
import {
    handleParticipantLeftRoom,
    handleSignalingData,
    prepareNewPeerConnection,
} from "./webRTCHandler";
import { getCurrentTimeInMilliseconds } from "../utils/other";
import {
    IConversation,
    IMessage,
    INewMessage,
    addNewMessage,
    updateConverstation,
} from "../redux/features/slices/chatSlice";
export type ConnUserSocketIdType = {
    connUserSocketId: string;
};

export interface MessageContent {
    friend_id: string;
    content: string;
}

interface ServerToClientEvents {
    "friends-invitations": (data: { pendingInvitations: Invitation[] }) => void;
    "friends-list": (data: { friends: Friend[] }) => void;
    "online-users": (data: { onlineUsers: OnlineUser[] }) => void;
    "direct-chat-history": (data: IConversation & { append?: boolean }) => void;
    "direct-message": (data: INewMessage) => void;
    // ------------------------------------------------------------
    "room-create": (data: any) => void;
    "active-rooms": (data: { activeRooms: ActiveRoom[] }) => void;
    "conn-prepare": (data: ConnUserSocketIdType) => void;
    "conn-init": (data: ConnUserSocketIdType) => void;
    "conn-signal": (data: any) => void;
    "room-participant-left": (data: ConnUserSocketIdType) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    "direct-message": (data: MessageContent) => void;
    "direct-chat-history": (data: any) => void;
    // -------------------------------------------------------------
    "room-create": () => void;
    "join-room": (data: { roomid: string }) => void;
    "leave-room": (data: { roomid: string }) => void;
    "conn-init": (data: ConnUserSocketIdType) => void;
    "conn-signal": (data: any) => void;
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

    // ---------------------------------------------------------------------------
    // rooms

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

            // also add rooms that we created ourselves
            const user = store.getState().auth.user;
            if (user && user._id === room.roomCreator.userId) {
                room.roomCreator.username = user.username;

                rooms.push({
                    ...room,
                });
            }
        });

        dispatch(setActiveRooms(rooms));
    });
    socket.on("room-create", (data) => {
        dispatch(setRoomDetails(data.roomDetails));
    });

    // ---------------------------------------------------------------------------
    // webrtc
    // here we receive the offer from the initiator
    // and create a new peer connection
    socket.on("conn-prepare", (data) => {
        console.log(
            " on conn-prepare"
            //  getCurrentTimeInMilliseconds()
        );
        const { connUserSocketId } = data;
        // since we are the receiver, we are not the initiator
        prepareNewPeerConnection(connUserSocketId, false);

        // send back a signal to the initiator to let them know that we are ready
        console.log(
            "emit conn-init"
            //  getCurrentTimeInMilliseconds()
        );
        socket.emit("conn-init", {
            connUserSocketId,
        });
    });

    // here we receive the signal from the receiver (we are the initiator)
    // and send back our signal
    socket.on("conn-init", (data) => {
        const { connUserSocketId } = data;
        console.log(
            "on conn init "
            //  getCurrentTimeInMilliseconds()
        );

        // here we are the initiator so we create a new peer connection
        prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on("conn-signal", (data) => {
        // console.log(
        //     "on conn-signal"
        //     // getCurrentTimeInMilliseconds()
        // );
        handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
        console.log("on room-participant-left");
        handleParticipantLeftRoom(data.connUserSocketId);
    });

    //------------------------------------------------------------------------
    // chat
    socket.on("direct-chat-history", (data) => {
        dispatch(updateConverstation(data));
    });

    socket.on("direct-message", (data) => {
        // console.log("on direct-message", data);
        dispatch(addNewMessage(data));
    });
};

export const getChatHistory = (friend_id: string, fromMessageId?: string) => {
    // console.log("emit direct-chat-history");
    socket.emit("direct-chat-history", { friend_id, fromMessageId });
};

export const sendDirectMessage = (messageContent: MessageContent) => {
    // console.log("emit direct-message");
    socket.emit("direct-message", messageContent);
};

export const createRoom = () => {
    // console.log("emit room-create");
    socket.emit("room-create");
};

export const joinRoom = (roomid: string) => {
    // console.log(
    //     "emit join-room"
    //     // getCurrentTimeInMilliseconds()
    // );
    socket.emit("join-room", { roomid });
};

export const leaveRoom = (roomid: string) => {
    socket.emit("leave-room", { roomid });
    // console.log("emit leaving room");
};

export const signalPeerData = (data: any) => {
    // console.log(
    //     "emit conn-signal"
    //     //  getCurrentTimeInMilliseconds()
    // );

    socket.emit("conn-signal", data);
};
