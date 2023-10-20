import { Socket } from "socket.io-client";

import { store } from "../../redux/store";
import { MessageContent, getSocket } from ".";
import {
    handleParticipantLeftRoom,
    handleSignalingData,
    prepareNewPeerConnection,
} from "../webRTCHandler";
import {
    addNewMessage,
    setConversations,
    updateConverstation,
    updateSeenMessages,
    updateTypingStatus,
} from "../../redux/features/slices/chatSlice";
import { setGroups } from "../../redux/features/slices/groupSlice";

export const connectWithSocketServer = () => {
    const socket = getSocket();
    if (!socket) return;

    const dispatch = store.dispatch;
    socket.on("direct-chat-history", (data) => {
        console.log("direct-chat-history", data);
        dispatch(updateConverstation(data));
    });

    socket.on("direct-message", (data) => {
        // console.log("on direct-message", data);
        dispatch(addNewMessage(data));
    });

    socket.on("typing-status", (data) => {
        dispatch(updateTypingStatus(data));
    });

    socket.on("seen-messages", (data) => {
        dispatch(updateSeenMessages(data));
    });

    socket.on("conversations", (data) => {
        console.log("conversations", data);
        dispatch(setConversations(data));
    });

    // groups
    socket.on("groups-list", (data) => {
        console.log("group list", data);
        dispatch(setGroups(data));
    });
};

export const getChatHistory = (friend_id: string, fromMessageId?: string) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("direct-chat-history", { friend_id, fromMessageId });
};

export const sendDirectMessage = (messageContent: MessageContent) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("direct-message", messageContent);
};

export const sendTypingStatus = (data: {
    isTyping: boolean;
    conversationId: string;
    participantIds: string[];
}) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("typing-status", data);
};

export const seenMessages = (data: { conversationId: string }) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("seen-messages", data);
};
