import { Socket } from "socket.io-client";

import { AppThunk, store } from "../../redux/store";
import {
    RoomDetails,
    emptyRoom,
    setActiveRooms,
    setRoomDetails,
} from "../../redux/features/slices/roomSlice";
import { getSocket } from ".";
import { leaveRoomHandler } from "../../utils/roomUtils";
import { getFriendById } from "../../utils/stateUtils";

export const connectWithSocketServer = (): AppThunk => (dispatch, getState) => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("active-rooms", ({ activeRooms }) => {
        console.log("active-rooms", activeRooms);
        const rooms: RoomDetails[] = [];

        activeRooms.forEach((room) => {
            const friend = getFriendById(getState, room.roomCreator.userId);
            let username = friend?.username;

            const user = getState().auth.user;
            if (user && user._id === room.roomCreator.userId) {
                username = user.username;
            }
            rooms.push({
                ...room,
                roomCreator: {
                    ...room.roomCreator,
                    username,
                },
            });
        });

        dispatch(setActiveRooms(rooms));
    });

    socket.on("room-create", (data) => {
        // add friend username to roomCreator
        const friend = getFriendById(
            getState,
            data.roomDetails.roomCreator.userId
        );
        let username = friend?.username;

        // if user is room creator, add user username to roomCreator
        const user = getState().auth.user;
        if (user && user._id === data.roomDetails.roomCreator.userId) {
            username = user.username;
        }

        const roomDetails = {
            ...data.roomDetails,
            roomCreator: {
                ...data.roomDetails.roomCreator,
                username,
            },
        };

        dispatch(setRoomDetails(roomDetails));
    });

    socket.on("call-rejected", (data) => {
        console.log("call-rejected");
        leaveRoomHandler();
        dispatch(emptyRoom());
    });
};

export const createRoom = (
    conversation_id: string,
    conversation_participants: string[],
    isGroup: boolean
) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("room-create", {
        conversation_id,
        conversation_participants,
        isGroup,
    });
};

export const joinRoom = (roomid: string) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("join-room", { roomid });
};

export const leaveRoom = (roomid: string) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("leave-room", { roomid });
};

export const rejectCall = (roomid: string) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("reject-call", { roomid });
};

export const ignoreCall = (roomid: string) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("ignore-call", { roomid });
};
