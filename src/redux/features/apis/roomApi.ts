import { apiSlice } from "../apiSlice";
import { getSocket } from "../../utils/socketHandler";
import { setActiveRooms, setRoomDetails } from "../slices/roomSlice";

export interface MessageContent {
    receiverUserId: string;
    content: string;
}

export interface Message {
    _id: string;
    author: {
        _id: string;
        username: string;
        avatar: string;
    };
    content: string;
    date: string;
    type: string;
}

export interface MessageHistory {
    participants: string[];
    messages: Message[];
}

export const roomApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createNewRoom: build.mutation<any, void>({
            queryFn: (_, { getState, dispatch }) => {
                const socket = getSocket(getState);

                if (!socket) return { data: "" };

                socket.emit("room-create");

                return { data: "" };
            },
        }),
    }),

    overrideExisting: false,
});

export const { useCreateNewRoomMutation } = roomApi;
