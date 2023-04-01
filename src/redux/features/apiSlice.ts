import { RootState } from "../store";
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_REACT_APP_API_URL}/`,
        prepareHeaders: (headers, { getState }) => {
            const user = (getState() as RootState).auth.user;
            const token = user?.token;

            // If we have a token set in state, let's assume that we should be passing it.
            // only set the header if the header authorization is not already set

            if (token && !headers.get("authorization")) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    keepUnusedDataFor: 9999999, //keep cache data forever

    tagTypes: [],
    endpoints: () => ({}),
});
