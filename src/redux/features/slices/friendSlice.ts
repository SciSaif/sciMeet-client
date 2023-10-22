import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Friend {
    _id: string;
    username: string;
    isOnline: boolean;
    conversation_id: string;
    avatar?: string;
}

export interface Invitation {
    _id: string;
    receiverId: string;
    senderId: {
        email: string;
        username: string;
        avatar?: string;
    };
}

export interface OnlineUser {
    userId: string;
    socketId: string;
}

interface initialStateProps {
    friends: Friend[];
    invitations: Invitation[];
    onlineUsers: OnlineUser[];
}

const initialState: initialStateProps = {
    friends: [],
    invitations: [],
    onlineUsers: [],
};

export const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        // setTheme: (state, action: PayloadAction<"light" | "dark">) => {
        //     state.theme = action.payload;
        // },
        setFriends: (state, action: PayloadAction<Friend[]>) => {
            state.friends = action.payload;
        },

        setInvitations: (state, action: PayloadAction<Invitation[]>) => {
            state.invitations = action.payload;
        },

        setOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
            state.onlineUsers = action.payload;
        },

        resetState: () => initialState,
    },
});

export const { setFriends, setInvitations, setOnlineUsers } =
    friendSlice.actions;
export default friendSlice.reducer;
