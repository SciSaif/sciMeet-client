import { apiSlice } from "../apiSlice";
import { getSocket } from "../../utils/socketHandler";

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
        //                 "direct-message",
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
                    console.log("e1");
                    await cacheDataLoaded;
                    console.log("e2");

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
            queryFn: () => {
                return {
                    data: [],
                };
            },
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
                    console.log("e3");
                    await cacheDataLoaded;
                    console.log("e4");

                    const socket = getSocket(getState);
                    if (!socket) return;
                    socket.on("connect", () => {
                        console.log("Connected to socket server, getFriends");
                        console.log(socket.id);
                    });

                    console.log("getFriends");

                    socket.on("friends-list", (data: { friends: Friend[] }) => {
                        console.log("friends-list", data.friends);
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
                    console.log("e5");
                    await cacheDataLoaded;
                    console.log("e6");

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
