import {configureStore, createListenerMiddleware} from "@reduxjs/toolkit";
import {apiSlice} from "./features/apiSlice";
import authReducer from "./features/slices/authSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
