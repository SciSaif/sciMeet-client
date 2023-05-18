import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
    isUserInRoom?: boolean;
    isUserRoomCreator?: boolean;
    roomDetails: null;
    activeRooms: [];
    localStream: null;
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
        // setTheme: (state, action: PayloadAction<"light" | "dark">) => {
        //     state.theme = action.payload;
        // },

        createNewRoom: (state) => {
            state.isUserInRoom = true;
            state.isUserRoomCreator = true;
        },

        resetState: () => initialState,
    },
});

export const { createNewRoom } = roomSlice.actions;
export default roomSlice.reducer;
