import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "./friendSlice";
import { Group } from "./groupSlice";
import { isGroup } from "../../../utils/other";
import { Bot } from "./botSlice";

// get theme from local storage
const theme = localStorage.getItem("theme");

interface Profile {
    type: "friend" | "group" | "bot" | "closed" | "personal";
    id?: string;
}

interface initialStateProps {
    theme: "light" | "dark";
    pendingInvitations: any;
    selectedChat?: Friend | Group | Bot;
    sidebarOpen: boolean;
    modalOpen: boolean;
    profile: Profile;
    isRoomFullScreen: boolean;
}

const initialState: initialStateProps = {
    theme: theme === "light" ? "light" : "dark",
    pendingInvitations: [],
    selectedChat: undefined,
    sidebarOpen: true,
    modalOpen: false,
    profile: {
        type: "closed",
        id: "",
    },
    isRoomFullScreen: true,
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

        setSelectedChat: (
            state,
            action: PayloadAction<Friend | Group | Bot | undefined>
        ) => {
            state.selectedChat = action.payload;
        },

        onGroupDelete: (state, action: PayloadAction<string>) => {
            const groupId = action.payload;
            if (
                isGroup(state.selectedChat) &&
                state.selectedChat._id === groupId
            ) {
                state.selectedChat = undefined;
            }

            if (
                state.profile.type === "group" &&
                state.profile.id === groupId
            ) {
                state.profile = {
                    type: "closed",
                    id: "",
                };
            }
        },

        onBotDelete: (state, action: PayloadAction<string>) => {
            const botId = action.payload;
            if (state.selectedChat?._id && state.selectedChat._id === botId) {
                state.selectedChat = undefined;
            }

            if (state.profile.type === "bot" && state.profile.id === botId) {
                state.profile = {
                    type: "closed",
                    id: "",
                };
            }
        },

        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        openSidebar: (state) => {
            state.sidebarOpen = true;
        },
        closeSidebar: (state) => {
            state.sidebarOpen = false;
        },

        setProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        },

        isModalOpen: (state, action: PayloadAction<boolean>) => {
            state.modalOpen = action.payload;
        },
        setIsRoomFullScreen: (state, action: PayloadAction<boolean>) => {
            state.isRoomFullScreen = action.payload;
        },
        resetState: () => initialState,
    },
});

export const {
    setTheme,
    setPendingInvitations,
    setIsRoomFullScreen,
    setSelectedChat,
    resetState,
    toggleSidebar,
    isModalOpen,
    openSidebar,
    closeSidebar,
    setProfile,
    onGroupDelete,
    onBotDelete,
} = otherSlice.actions;
export default otherSlice.reducer;
