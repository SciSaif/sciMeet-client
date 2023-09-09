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
    firstMessage?: boolean;
}

export interface IConversation {
    _id: string;
    participants: string[];
    messages: IMessage[];
    isGroup?: boolean;
    groupId?: string;
}

interface initialStateProps {
    conversations: IConversation[];
}

const initialState: initialStateProps = {
    conversations: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
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

        resetState: () => initialState,
    },
});

export const { updateConverstation, addNewMessage, resetState } =
    chatSlice.actions;
export default chatSlice.reducer;
