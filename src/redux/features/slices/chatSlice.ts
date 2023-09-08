import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        updateConverstation: (state, action: PayloadAction<IConversation>) => {
            // if conversation exists in the state, replace it
            const index = state.conversations.findIndex(
                (conversation) => conversation._id === action.payload._id
            );
            if (index !== -1) {
                state.conversations[index] = action.payload;
                return;
            }
            // else add it to the state
            state.conversations.push(action.payload);
        },

        resetState: () => initialState,
    },
});

export const { updateConverstation, resetState } = chatSlice.actions;
export default chatSlice.reducer;
