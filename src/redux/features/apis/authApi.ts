import { apiSlice } from "../apiSlice";
import { auth } from "../../../../firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<string, { email: string; password: string }>({
            queryFn: async ({ email, password }) => {
                try {
                    const response = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    if (!response.user.emailVerified) {
                        await sendEmailVerification(response.user);
                        return {
                            error: {
                                status: "CUSTOM_ERROR",
                                error: "Email not verified, please check your mail.",
                            },
                        };
                    }

                    const data = await response.user.getIdTokenResult();
                    console.log("in login api", data);

                    return { data: data.token };
                } catch (error: any) {
                    console.log(error.code);
                    let errorMessage =
                        "Something went wrong, please try again later";
                    if (
                        error.code === "auth/user-not-found" ||
                        error.code === "auth/wrong-password"
                    ) {
                        errorMessage = "Invalid email or password";
                    } else if (error.code === "auth/too-many-requests") {
                        errorMessage =
                            "Too many requests, please try again later";
                    }
                    return {
                        error: { status: "CUSTOM_ERROR", error: errorMessage },
                    };
                    // return {error: error.code};
                }
            },
        }),

        register: build.mutation<any, { email: string; password: string }>({
            queryFn: async ({ email, password }) => {
                try {
                    const response = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    console.log(response);

                    const res = await sendEmailVerification(response.user);
                    // const token = await response.user.getIdToken();

                    // after email is sent create the user in backend

                    // const user = {
                    // 	token,
                    // 	uid: response.user.uid,
                    // 	email: response.user.email,
                    // };
                    return { data: "email verification link sent" };
                } catch (error: any) {
                    console.log(error);
                    let errorMessage =
                        "Something went wrong, please try again later";
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage = "A user with this email already exists";
                    } else if (error.code === "auth/too-many-requests") {
                        errorMessage =
                            "Too many requests, please try again later";
                    }
                    return {
                        error: { status: "CUSTOM_ERROR", error: errorMessage },
                    };
                }
            },
        }),

        loginOnbackend: build.mutation<
            {
                email: string;
                token: string;
                _id: string;
                newUser: boolean;
                username?: string;
            },
            { token: string }
        >({
            query: ({ token }) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                },
            }),
        }),

        setUsername: build.mutation<{ username: string }, string>({
            query: (username) => ({
                url: "auth/setUsername",
                method: "POST",
                body: {
                    username,
                },
            }),
        }),

        test: build.query<any, void>({
            query: () => ({
                url: "auth/test",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLoginOnbackendMutation,
    useTestQuery,
    useSetUsernameMutation,
} = authApi;
