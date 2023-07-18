import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RoomDetails {
    roomCreator: {
        userId: string;
        socketId: string;
    };
    participants: {
        userId: string;
        socketId: string;
    }[];
    roomid: string;
}

export interface ActiveRoom {
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
}

interface initialStateProps {
    isUserInRoom?: boolean;
    isUserRoomCreator?: boolean;
    roomDetails: RoomDetails | null;
    activeRooms: ActiveRoom[];
    localStream: MediaStream | null;
    remoteStreams: [];
    audioOnly: boolean;
    screenSharingStream: null;
    isScreenSharingActive: boolean;
}

const initialState: initialStateProps = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
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

        setRoomDetails: (state, action: PayloadAction<RoomDetails>) => {
            state.roomDetails = action.payload;
        },

        setActiveRooms: (state, action: PayloadAction<ActiveRoom[]>) => {
            state.activeRooms = action.payload;
        },

        setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
            state.localStream = action.payload;
        },

        resetState: () => initialState,
    },
});

export const { setRoomState, setRoomDetails, setLocalStream, setActiveRooms } =
    roomSlice.actions;
export default roomSlice.reducer;
