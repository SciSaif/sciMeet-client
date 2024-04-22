import { apiSlice } from "../apiSlice";

interface BotType {
    _id: string;
    username: string;
    avatar: string;
    bot_type: string;
}

export const botApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createBot: build.mutation<
            { toast: string },
            { bot_name: string; participants: string[]; api_key?: string }
        >({
            query: (data) => ({
                url: `bots`,
                method: "POST",
                body: {
                    ...data,
                    avatar: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2024/02/google-gemini-ai-icon.png",
                },
            }),
        }),
        deleteBot: build.mutation<{ toast: string }, string>({
            query: (botId) => ({
                url: `bots/${botId}`,
                method: "DELETE",
            }),
        }),
        updateBot: build.mutation<
            { toast: string },
            {
                bot_id: string;
                bot_name?: string;
                description?: string;
                api_key?: string;
            }
        >({
            query: (data) => ({
                url: `bots`,
                method: "PUT",
                body: data,
            }),
        }),
        getBotTypes: build.query<BotType[], void>({
            query: () => ({
                url: `bots/types`,
                method: "GET",
            }),
        }),
    }),

    overrideExisting: false,
});

export const {
    useCreateBotMutation,
    useDeleteBotMutation,
    useUpdateBotMutation,
    useGetBotTypesQuery,
} = botApi;
