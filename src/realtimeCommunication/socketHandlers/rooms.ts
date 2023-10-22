import { Socket } from "socket.io-client";

import { store } from "../../redux/store";
import {
    ActiveRoom,
    setActiveRooms,
    setRoomDetails,
} from "../../redux/features/slices/roomSlice";
import { getSocket } from ".";
import { Friend } from "../../redux/features/slices/friendSlice";

export const connectWithSocketServer = () => {
    const socket = getSocket();
    if (!socket) return;

    const dispatch = store.dispatch;

    socket.on("active-rooms", ({ activeRooms }) => {
        console.log("active-rooms", activeRooms);
        const friends = store.getState().friend.friends;
        const rooms: ActiveRoom[] = [];

        activeRooms.forEach((room) => {
            friends.forEach((f: Friend) => {
                if (f._id === room.roomCreator.userId) {
                    room.roomCreator.username = f.username;
                    rooms.push({
                        ...room,
                    });
                }
            });

            const user = store.getState().auth.user;
            if (user && user._id === room.roomCreator.userId) {
                room.roomCreator.username = user.username;
                rooms.push({
                    ...room,
                });
            }
        });

        dispatch(setActiveRooms(rooms));
    });

    socket.on("room-create", (data) => {
        dispatch(setRoomDetails(data.roomDetails));
    });
};

export const createRoom = () => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("room-create");
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