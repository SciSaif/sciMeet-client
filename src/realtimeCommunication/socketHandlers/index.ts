import { isGroup } from "./../../utils/other";
import { Socket, io } from "socket.io-client";

import { connectWithSocketServer as connectFriends } from "./friends";
import { connectWithSocketServer as connectRooms } from "./rooms";
import { connectWithSocketServer as connectWebRTC } from "./webRTC";
import { connectWithSocketServer as connectChat } from "./chat";
import { AppDispatch, AppThunk, RootState, store } from "../../redux/store";
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
import { Group } from "../../redux/features/slices/groupSlice";
import { RoomDetails } from "../../redux/features/slices/roomSlice";

export type ConnUserSocketIdType = {
    connUserSocketId: string;
    isGroup?: boolean;
};

export interface MessageContent {
    conversation_id: string;
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
    "seen-messages": (data: {
        conversation_id: string;
        userId: string;
    }) => void;
    conversations: (data: IConversation[]) => void;
    "groups-list": (data: Group[]) => void;
    "new-group": (data: { group: Group; conversation: IConversation }) => void;
    "group-deleted": (data: { groupId: string }) => void;
    "group-updated": (data: { group: Group }) => void;
    // ------------------------------------------------------------
    "room-create": (data: { roomDetails: RoomDetails }) => void;
    "active-rooms": (data: { activeRooms: RoomDetails[] }) => void;
    "call-rejected": (data: { roomid: string }) => void;
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
        conversation_id: string;
        participantIds: string[];
    }) => void;
    "seen-messages": (data: { conversation_id: string }) => void;
    // -------------------------------------------------------------
    "room-create": (data: {
        conversation_id: string;
        conversation_participants: string[];
        isGroup: boolean;
    }) => void;
    "join-room": (data: { roomid: string }) => void;
    "leave-room": (data: { roomid: string }) => void;
    "reject-call": (data: { roomid: string }) => void;
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

export const connectAllSocketHandlers =
    (): AppThunk => (dispatch, getState) => {
        dispatch(connectFriends());
        dispatch(connectRooms());
        dispatch(connectWebRTC());
        dispatch(connectChat());
    };
