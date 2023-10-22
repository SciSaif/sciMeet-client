import { apiSlice } from "../apiSlice";

export const groupApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createGroup: build.mutation<
            { toast: string },
            { group_name: string; participants: string[] }
        >({
            query: (data) => ({
                url: `groups`,
                method: "POST",
                body: { ...data, avatar: "group.png" },
            }),
        }),
        deleteGroup: build.mutation<{ toast: string }, string>({
            query: (groupId) => ({
                url: `groups/${groupId}`,
                method: "DELETE",
            }),
        }),
    }),

    overrideExisting: false,
});

export const { useCreateGroupMutation, useDeleteGroupMutation } = groupApi;
