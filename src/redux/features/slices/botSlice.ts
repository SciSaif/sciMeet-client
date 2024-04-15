import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Bot {
    creator_id: string;
    _id: string;
    conversation_id: string;
    bot_name: string;
    avatar?: string;
    description?: string;
}

interface initialStateProps {
    bots: Bot[];
}

const initialState: initialStateProps = {
    bots: [],
};

export const botSlice = createSlice({
    name: "bot",
    initialState,
    reducers: {
        setBots: (state, action: PayloadAction<Bot[]>) => {
            state.bots = action.payload;
        },

        addBot: (state, action: PayloadAction<Bot>) => {
            state.bots.push(action.payload);
        },

        removeBot: (state, action: PayloadAction<string>) => {
            state.bots = state.bots.filter((bot) => bot._id !== action.payload);
        },

        updateBot: (state, action: PayloadAction<Bot>) => {
            const index = state.bots.findIndex(
                (bot) => bot._id === action.payload._id
            );
            if (index !== -1) {
                state.bots[index] = action.payload;
            }
        },
        resetState: () => initialState,
    },
});

export const { setBots, addBot, removeBot, updateBot } = botSlice.actions;
export default botSlice.reducer;
