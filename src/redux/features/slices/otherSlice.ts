import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "./friendSlice";
import { Group } from "./groupSlice";

// get theme from local storage
const theme = localStorage.getItem("theme");

interface initialStateProps {
    theme: "light" | "dark";
    pendingInvitations: any;
    selectedFriend?: Friend;
    selectedGroup?: Group;
    sidebarOpen: boolean;
    modalOpen: boolean;
    profileOpen: boolean;
}

const initialState: initialStateProps = {
    theme: theme === "light" ? "light" : "dark",
    pendingInvitations: [],
    selectedFriend: undefined,
    selectedGroup: undefined,
    sidebarOpen: true,
    modalOpen: false,
    profileOpen: false,
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

        setSelectedFriend: (state, action: PayloadAction<Friend>) => {
            state.selectedFriend = action.payload;
            state.selectedGroup = undefined;
        },

        setSelectedGroup: (state, action: PayloadAction<Group>) => {
            state.selectedGroup = action.payload;
            state.selectedFriend = undefined;
        },

        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleProfile: (state) => {
            state.profileOpen = !state.profileOpen;
        },
        isModalOpen: (state, action: PayloadAction<boolean>) => {
            state.modalOpen = action.payload;
        },
        resetState: () => initialState,
    },
});

export const {
    setTheme,
    setPendingInvitations,
    setSelectedFriend,
    setSelectedGroup,
    resetState,
    toggleSidebar,
    toggleProfile,
    isModalOpen,
} = otherSlice.actions;
export default otherSlice.reducer;
