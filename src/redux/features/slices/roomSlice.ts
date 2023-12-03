import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoomDetails {
    roomCreator: {
        userId: string;
        socketId: string;
        username?: string;
    };
    participants: {
        userId: string;
        socketId: string;
    }[];
    roomid: string;
    conversation_id: string;
    conversation_participants: string[];
    isGroup: boolean;
    ignoredBy?: string[];
}

interface initialStateProps {
    isUserInRoom?: boolean;
    isUserRoomCreator?: boolean;
    roomDetails: RoomDetails | null;
    activeRooms: RoomDetails[];
    localStreamChanged: boolean;
    remoteStreamsChanged: boolean;
    screenShareChanged: boolean;
    audioOnly: boolean;
}

const initialState: initialStateProps = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStreamChanged: false,
    remoteStreamsChanged: false,
    screenShareChanged: false,
    audioOnly: false,
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomState: (
            state,
            action: PayloadAction<{
                isUserInRoom: boolean;
                isUserRoomCreator: boolean;
            }>
        ) => {
            state.isUserInRoom = action.payload.isUserInRoom;
            state.isUserRoomCreator = action.payload.isUserRoomCreator;
        },

        setRoomDetails: (state, action: PayloadAction<RoomDetails | null>) => {
            state.roomDetails = action.payload;
        },

        setActiveRooms: (state, action: PayloadAction<RoomDetails[]>) => {
            state.activeRooms = action.payload;
        },

        toggleLocalStreamChanged: (state) => {
            state.localStreamChanged = !state.localStreamChanged;
        },

        toggleRemoteStreamsChanged: (state) => {
            state.remoteStreamsChanged = !state.remoteStreamsChanged;
        },

        toggleScreenShareChanged: (state) => {
            state.screenShareChanged = !state.screenShareChanged;
        },

        emptyRoom: (state) => {
            state.roomDetails = null;
            state.isUserInRoom = false;
            state.isUserRoomCreator = false;
        },
        resetState: () => initialState,
    },
});

export const {
    setRoomState,

    setRoomDetails,
    emptyRoom,
    setActiveRooms,
    toggleLocalStreamChanged,
    toggleRemoteStreamsChanged,
    toggleScreenShareChanged,
} = roomSlice.actions;
export default roomSlice.reducer;
