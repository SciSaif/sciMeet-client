import { Socket, io } from "socket.io-client";
import { apiSlice } from "../apiSlice";
import { RootState } from "../../store";

export interface Invitation {
    _id: string;
    receiverId: string;
    senderId: {
        email: string;
        username: string;
    };
}

export interface Friend {
    _id: string;
    username: string;
    isOnline: boolean;
}

export interface OnlineUser {
    userId: string;
    socketId: string;
}

interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    "friends-invitations": (data: any) => void;
    "friends-list": (data: any) => void;
    "online-users": (data: any) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

function getSocket(getState: () => unknown) {
    let state = getState() as RootState;
    if (state.auth.user === null) return;
    const token = state.auth.user.token;
    if (!socket) {
        socket = io("http://localhost:5002", {
            auth: {
                token,
            },
        });
    }
    return socket;
}

export const friendApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        postInvite: build.mutation<any, { email: string }>({
            query: ({ email }) => ({
                url: `friend-invitation/invite`,
                method: "POST",
                body: { email },
            }),
        }),

        // sendMessage: build.mutation<any, string>({
        //     queryFn: (chatMessageContent: string, { getState }) => {
        //         const socket = getSocket(getState);

        //         if (!socket) return { data: "" };

        //         return new Promise((resolve) => {
        //             socket.emit(
        //                 "message",
        //                 chatMessageContent,
        //                 (message: string) => {
        //                     resolve({ data: message });
        //                 }
        //             );
        //         });
        //     },
        // }),

        getOnlineUsers: build.query<OnlineUser[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                _,
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

                    socket.on(
                        "online-users",
                        (data: { onlineUsers: OnlineUser[] }) => {
                            updateCachedData((draft) => {
                                // replace cached data with new data
                                draft.splice(
                                    0,
                                    draft.length,
                                    ...data.onlineUsers
                                );
                            });
                        }
                    );

                    await cacheEntryRemoved;

                    socket.off("connect");
                    socket.off("online-users");
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        getFriends: build.query<Friend[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                _,
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

                    socket.on("friends-list", (data: { friends: Friend[] }) => {
                        updateCachedData((draft) => {
                            // replace cached data with new data
                            draft.splice(0, draft.length, ...data.friends);
                        });
                    });

                    await cacheEntryRemoved;

                    socket.off("connect");
                    socket.off("friends-list");
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        getFriendsInvitations: build.query<Invitation[], void>({
            queryFn: () => ({ data: [] }),

            async onCacheEntryAdded(
                _,
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

                    socket.on(
                        "friends-invitations",
                        (data: { pendingInvitations: Invitation[] }) => {
                            updateCachedData((draft) => {
                                // replace cached data with new data
                                draft.splice(
                                    0,
                                    draft.length,
                                    ...data.pendingInvitations
                                );
                            });
                        }
                    );

                    await cacheEntryRemoved;

                    socket.off("connect");
                    socket.off("friends-invitations");
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        rejectInvitation: build.mutation<any, { _id: string }>({
            query: ({ _id }) => ({
                url: `friend-invitation/reject`,
                method: "POST",
                body: { _id },
            }),
        }),

        acceptInvitation: build.mutation<any, { _id: string }>({
            query: ({ _id }) => ({
                url: `friend-invitation/accept`,
                method: "POST",
                body: { _id },
            }),
        }),
    }),

    overrideExisting: false,
});

export const {
    usePostInviteMutation,
    useGetFriendsInvitationsQuery,
    useRejectInvitationMutation,
    useAcceptInvitationMutation,
    useGetFriendsQuery,
    useGetOnlineUsersQuery,
} = friendApi;
