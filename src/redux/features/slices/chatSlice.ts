// getMessageHistory: build.query<Message[], { receiverUserId: string }>({
//     queryFn: ({ receiverUserId }) => ({ data: [] }),
//     async onCacheEntryAdded(
//         { receiverUserId },
//         {
//             cacheDataLoaded,
//             cacheEntryRemoved,
//             updateCachedData,
//             getState,
//         }
//     ) {
//         try {
//             await cacheDataLoaded;

//             const socket = getSocket(getState);
//             if (!socket) return;
//             socket.on("connect", () => {
//                 console.log("Connected to socket server");
//                 console.log(socket.id);
//             });
//             // con

//             socket.emit("direct-chat-history", { receiverUserId });
//             socket.on("direct-chat-history", (data) => {
//                 updateCachedData((draft) => {
//                     const participants = data.participants;
//                     if (participants.includes(receiverUserId)) {
//                         // replace cached data with new data
//                         draft.splice(0, draft.length, ...data.messages);
//                     }
//                 });
//             });

//             await cacheEntryRemoved;

//             socket.off("connect");
//             socket.off("direct-chat-history");
//         } catch {
//             // if cacheEntryRemoved resolved before cacheDataLoaded,
//             // cacheDataLoaded throws
//         }
//     },
// }),

// need to convert the above to slice instead of rtk query

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

interface initialStateProps {
    messageHistories: MessageHistory[];
}

const initialState: initialStateProps = {
    messageHistories: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        resetState: () => initialState,
    },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
