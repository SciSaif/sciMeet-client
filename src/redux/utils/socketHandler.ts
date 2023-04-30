import { Socket, io } from "socket.io-client";
import { RootState } from "../store";
import { MessageContent, MessageHistory } from "../features/apis/chatApi";

interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    "friends-invitations": (data: any) => void;
    "friends-list": (data: any) => void;
    "online-users": (data: any) => void;
    "direct-chat-history": (data: MessageHistory) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    "direct-message": (data: MessageContent) => void;
    "direct-chat-history": (data: any) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function getSocket(getState: () => unknown) {
    let state = getState() as RootState;
    if (state.auth.user === null) return;
    const token = state.auth.user.token;
    if (!socket) {
        socket = io("http://localhost:5002", {
            auth: {
                token,
            },
        });
    }
    return socket;
}

export function closeSocket() {
    if (socket) {
        socket.close();
        socket = undefined!;
    }
}
