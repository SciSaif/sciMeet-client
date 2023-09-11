import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INewMessage {
    conversationId: string;
    message: IMessage;
}

export interface IMessage {
    _id: string;
    author: {
        _id: string;
        username: string;
        avatar: string;
    };
    content: string;
    date: string;
    type: string;
    seenBy: {
        userId: string;
        date: string;
    }[];
    firstMessage?: boolean;
}

export interface IConversation {
    _id: string;
    participants: string[];
    messages: IMessage[];
    isGroup?: boolean;
    groupId?: string;
}

export interface ITypingUsers {
    conversationId: string;
    typingUsers: string[];
}

interface initialStateProps {
    conversations: IConversation[];
    typingStatus: ITypingUsers[];
}

const initialState: initialStateProps = {
    conversations: [],
    typingStatus: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateTypingStatus: (state, action: PayloadAction<ITypingUsers>) => {
            const index = state.typingStatus.findIndex(
                (status) =>
                    status.conversationId === action.payload.conversationId
            );
            if (index !== -1) {
                state.typingStatus[index] = action.payload;
                return;
            }
            state.typingStatus.push(action.payload);
        },

        setConversations: (state, action: PayloadAction<IConversation[]>) => {
            state.conversations = action.payload;
        },

        updateConverstation: (
            state,
            action: PayloadAction<IConversation & { append?: boolean }>
        ) => {
            // if conversation exists in the state, replace it
            const index = state.conversations.findIndex(
                (conversation) => conversation._id === action.payload._id
            );
            if (index !== -1) {
                // if append is true, then add the messages at the start of the array
                if (action.payload.append) {
                    state.conversations[index].messages = [
                        ...action.payload.messages,
                        ...state.conversations[index].messages,
                    ];
                    return;
                }

                state.conversations[index] = action.payload;
                return;
            }
            // else add it to the state
            state.conversations.push(action.payload);
        },

        addNewMessage: (state, action: PayloadAction<INewMessage>) => {
            const { conversationId, message } = action.payload;
            const conversation = state.conversations.find(
                (conversation) => conversation._id === conversationId
            );
            if (!conversation) return;

            conversation.messages.push(message);
        },

        updateSeenMessages: (
            state,
            action: PayloadAction<{ conversationId: string; userId: string }>
        ) => {
            const conversation = state.conversations.find(
                (conversation) =>
                    conversation._id === action.payload.conversationId
            );
            if (!conversation) return;

            // make sure to not add userId if its already present
            // start from last message and keep updating till we find a message where userId is already present, then break out
            for (let i = conversation.messages.length - 1; i >= 0; i--) {
                const seenBy = conversation.messages[i].seenBy;
                // do no update message posted by the same user
                if (
                    conversation.messages[i].author._id ===
                    action.payload.userId
                ) {
                    continue;
                }
                if (
                    seenBy.some((user) => user.userId === action.payload.userId)
                ) {
                    break;
                }
                seenBy.push({
                    userId: action.payload.userId,
                    date: new Date().toISOString(),
                });
            }
        },

        resetState: () => initialState,
    },
});

export const {
    updateConverstation,
    addNewMessage,
    resetState,
    updateTypingStatus,
    updateSeenMessages,
    setConversations,
} = chatSlice.actions;
export default chatSlice.reducer;
