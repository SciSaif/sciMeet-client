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
                body: data,
            }),
        }),
        getGroups: build.mutation<
            { toast: string },
            { group_name: string; participants: string[] }
        >({
            query: (data) => ({
                url: `groups`,
                method: "POST",
                body: data,
            }),
        }),
    }),

    overrideExisting: false,
});

export const { useCreateGroupMutation } = groupApi;
