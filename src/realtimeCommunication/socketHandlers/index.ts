import { Socket, io } from "socket.io-client";

import { connectWithSocketServer as connectFriends } from "./friends";
import { connectWithSocketServer as connectRooms } from "./rooms";
import { connectWithSocketServer as connectWebRTC } from "./webRTC";
import { connectWithSocketServer as connectChat } from "./chat";
import { RootState, store } from "../../redux/store";
import {
    Friend,
    Invitation,
    OnlineUser,
} from "../../redux/features/slices/friendSlice";
import {
    IConversation,
    INewMessage,
    ITypingUsers,
} from "../../redux/features/slices/chatSlice";
import { ActiveRoom } from "../../redux/features/slices/roomSlice";
import { Group } from "../../redux/features/slices/groupSlice";

export type ConnUserSocketIdType = {
    connUserSocketId: string;
};

export interface MessageContent {
    friend_id: string;
    content: string;
    file?: string | ArrayBuffer | Blob | null;
    fileName?: string;
    fileType?: string;
}

interface ServerToClientEvents {
    "friends-invitations": (data: { pendingInvitations: Invitation[] }) => void;
    "friends-list": (data: { friends: Friend[] }) => void;
    "online-users": (data: { onlineUsers: OnlineUser[] }) => void;
    "direct-chat-history": (data: IConversation & { append?: boolean }) => void;
    "direct-message": (data: INewMessage) => void;
    "typing-status": (data: ITypingUsers) => void;
    "seen-messages": (data: { conversationId: string; userId: string }) => void;
    conversations: (data: IConversation[]) => void;
    "groups-list": (data: Group[]) => void;
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
    "typing-status": (data: {
        isTyping: boolean;
        conversationId: string;
        participantIds: string[];
    }) => void;
    "seen-messages": (data: { conversationId: string }) => void;
    // -------------------------------------------------------------
    "room-create": () => void;
    "join-room": (data: { roomid: string }) => void;
    "leave-room": (data: { roomid: string }) => void;
    "conn-init": (data: ConnUserSocketIdType) => void;
    "conn-signal": (data: any) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function getSocket() {
    let state = store.getState() as RootState;
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

export const connectAllSocketHandlers = () => {
    connectFriends();
    connectRooms();
    connectWebRTC();
    connectChat();
};
