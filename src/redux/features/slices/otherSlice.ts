import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// get theme from local storage
const theme = localStorage.getItem("theme");

interface initialStateProps {
    theme: "light" | "dark";
    pendingInvitations: any;
    selectedFriend?: {
        _id: string;
        username: string;
    };
    chatOpen: boolean;
}

const initialState: initialStateProps = {
    theme: theme === "light" ? "light" : "dark",
    pendingInvitations: [],
    selectedFriend: undefined,
    chatOpen: false,
};

export const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
        },

        setPendingInvitations: (state, action: PayloadAction<string[]>) => {
            state.pendingInvitations = action.payload;
        },

        setSelectedFriend: (
            state,
            action: PayloadAction<{ _id: string; username: string }>
        ) => {
            state.selectedFriend = action.payload;
        },

        toggleChatOpen: (state) => {
            state.chatOpen = !state.chatOpen;
        },

        resetState: () => initialState,
    },
});

export const {
    setTheme,
    setPendingInvitations,
    setSelectedFriend,
    resetState,
    toggleChatOpen,
} = otherSlice.actions;
export default otherSlice.reducer;
