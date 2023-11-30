import { Socket } from "socket.io-client";

import { AppThunk } from "../../redux/store";
import { MessageContent, getSocket } from ".";
import {
    handleParticipantLeftRoom,
    handleSignalingData,
    prepareNewPeerConnection,
} from "../webRTCHandler";
import {
    addConversation,
    addNewMessage,
    removeConversationByGroupId,
    setConversations,
    updateConverstation,
    updateSeenMessages,
    updateTypingStatus,
} from "../../redux/features/slices/chatSlice";
import {
    addGroup,
    removeGroup,
    setGroups,
    updateGroup,
} from "../../redux/features/slices/groupSlice";
import { onGroupDelete } from "../../redux/features/slices/otherSlice";

export const connectWithSocketServer = (): AppThunk => (dispatch, getState) => {
    const socket = getSocket();
    if (!socket) return;

    // const dispatch = store.dispatch;
    socket.on("direct-chat-history", (data) => {
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
    socket.on("new-group", (data) => {
        console.log("new group", data);
        dispatch(addGroup(data.group));
        dispatch(addConversation(data.conversation));
    });
    socket.on("group-deleted", (data) => {
        dispatch(onGroupDelete(data.groupId));
        dispatch(removeGroup(data.groupId));
        dispatch(removeConversationByGroupId(data.groupId));
    });
    socket.on("group-updated", (data) => {
        console.log("group-updated", data);
        dispatch(updateGroup(data.group));
    });
};

export const getChatHistory = (
    conversation_id: string,
    fromMessageId?: string
) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("direct-chat-history", { conversation_id, fromMessageId });
};

export const sendDirectMessage = (messageContent: MessageContent) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("direct-message", messageContent);
};

export const sendTypingStatus = (data: {
    isTyping: boolean;
    conversation_id: string;
    participantIds: string[];
}) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("typing-status", data);
};

export const seenMessages = (data: { conversation_id: string }) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("seen-messages", data);
};
