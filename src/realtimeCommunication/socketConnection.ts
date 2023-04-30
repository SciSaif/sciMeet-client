import io from "socket.io-client";
import { UserProps } from "../redux/features/slices/authSlice";
import { store } from "../redux/store";
import { setPendingInvitations } from "../redux/features/slices/otherSlice";

let socket: any = null;

export const connectWithSocketServer = (user: UserProps) => {
    socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
        auth: {
            token: user.token,
        },
    });

    socket.on("connect", () => {
        console.log("Connected to socket server");
        console.log(socket.id);
    });

    socket.on("friends-invitations", (data: any) => {
        const { pendingInvitations } = data;
        console.log("pendingInvitations", pendingInvitations);
        store.dispatch(setPendingInvitations(pendingInvitations));
    });
};
