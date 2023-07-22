import { apiSlice } from "../apiSlice";
import { getSocket } from "../../../realtimeCommunication/socketHandler";

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

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        directMessage: build.mutation<any, MessageContent>({
            queryFn: (chatMessageContent, { getState }) => {
                const socket = getSocket(getState);

                if (!socket) return { data: "" };

                socket.emit("direct-message", chatMessageContent);

                return { data: "" };
            },
        }),

        getMessageHistory: build.query<Message[], { receiverUserId: string }>({
            queryFn: ({ receiverUserId }) => ({ data: [] }),
            async onCacheEntryAdded(
                { receiverUserId },
                {
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    updateCachedData,
                    getState,
                }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket(getState);
                    if (!socket) return;
                    socket.on("connect", () => {
                        console.log("Connected to socket server");
                        console.log(socket.id);
                    });

                    socket.emit("direct-chat-history", { receiverUserId });
                    socket.on("direct-chat-history", (data) => {
                        updateCachedData((draft) => {
                            const participants = data.participants;
                            if (participants.includes(receiverUserId)) {
                                // replace cached data with new data
                                draft.splice(0, draft.length, ...data.messages);
                            }
                        });
                    });

                    await cacheEntryRemoved;

                    socket.off("connect");
                    socket.off("direct-chat-history");
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),
    }),

    overrideExisting: false,
});

export const { useDirectMessageMutation, useGetMessageHistoryQuery } = chatApi;
