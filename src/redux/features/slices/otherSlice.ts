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
        avatar?: string;
    };
    sidebarOpen: boolean;
}

const initialState: initialStateProps = {
    theme: theme === "light" ? "light" : "dark",
    pendingInvitations: [],
    selectedFriend: undefined,
    sidebarOpen: true,
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
            action: PayloadAction<{
                _id: string;
                username: string;
                avatar?: string;
            }>
        ) => {
            state.selectedFriend = action.payload;
        },

        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },

        resetState: () => initialState,
    },
});

export const {
    setTheme,
    setPendingInvitations,
    setSelectedFriend,
    resetState,
    toggleSidebar,
} = otherSlice.actions;
export default otherSlice.reducer;
