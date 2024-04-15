import {
    AnyAction,
    ThunkAction,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import authReducer from "./features/slices/authSlice";
import otherReducer from "./features/slices/otherSlice";
import roomReducer from "./features/slices/roomSlice";
import friendReducer from "./features/slices/friendSlice";
import chatReducer from "./features/slices/chatSlice";
import groupReducer from "./features/slices/groupSlice";
import botReducer from "./features/slices/botSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        other: otherReducer,
        room: roomReducer,
        friend: friendReducer,
        chat: chatReducer,
        group: groupReducer,
        bot: botReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    AnyAction
>;
