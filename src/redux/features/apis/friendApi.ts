import { apiSlice } from "../apiSlice";

export const friendApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        postInvite: build.mutation<any, { email: string }>({
            query: ({ email }) => ({
                url: `friend-invitation/invite`,
                method: "POST",
                body: { email },
            }),
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
    useRejectInvitationMutation,
    useAcceptInvitationMutation,
} = friendApi;
