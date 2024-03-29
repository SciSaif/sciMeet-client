import { authApi } from "./../apis/authApi";
import { apiSlice } from "./../apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user") || "{}");

export interface UserProps {
    _id: string;
    email: string;
    token: string;
    newUser: boolean;
    username?: string;
    avatar?: string;
}

interface initialStateProps {
    user: UserProps | null;
}

const initialState: initialStateProps = {
    user: user,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload;
        },

        resetState: () => {
            return { user: null };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.loginOnbackend.matchFulfilled,
            (state, action) => {
                let newUser = {
                    ...state.user,
                    _id: action.payload._id,
                    email: action.payload.email,
                    token: action.payload.token,
                    newUser: action.payload.newUser,
                    username: action.payload.username,
                    avatar: action.payload.avatar,
                };

                // add to local storage
                localStorage.setItem("user", JSON.stringify(newUser));
                state.user = newUser;
            }
        );
        builder.addMatcher(
            authApi.endpoints.setUsername.matchFulfilled,
            (state, action) => {
                if (!state.user) return;
                let newUser = {
                    ...state.user,
                    username: action.payload.username,
                    newUser: false,
                    avatar: action.payload.avatar,
                };

                // add to local storage
                localStorage.setItem("user", JSON.stringify(newUser));
                // @ts-ignore
                state.user = newUser;
            }
        );
    },
});

export const { setUser, resetState } = authSlice.actions;
export default authSlice.reducer;
