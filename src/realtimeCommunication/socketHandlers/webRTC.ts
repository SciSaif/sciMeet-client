import { Socket } from "socket.io-client";

import { store } from "../../redux/store";
import { getSocket } from ".";
import {
    handleParticipantLeftRoom,
    handleSignalingData,
    prepareNewPeerConnection,
} from "../webRTCHandler";
import { emptyRoom } from "../../redux/features/slices/roomSlice";

export const connectWithSocketServer = () => {
    const socket = getSocket();
    if (!socket) return;

    const dispatch = store.dispatch;

    // ---------------------------------------------------------------------------
    // webrtc
    // here we receive the offer from the initiator
    // and create a new peer connection
    socket.on("conn-prepare", (data) => {
        console.log(
            " on conn-prepare"
            //  getCurrentTimeInMilliseconds()
        );
        const { connUserSocketId } = data;
        // since we are the receiver, we are not the initiator
        prepareNewPeerConnection(connUserSocketId, false);

        // send back a signal to the initiator to let them know that we are ready
        console.log(
            "emit conn-init"
            //  getCurrentTimeInMilliseconds()
        );
        socket.emit("conn-init", {
            connUserSocketId,
        });
    });

    // here we receive the signal from the receiver (we are the initiator)
    // and send back our signal
    socket.on("conn-init", (data) => {
        const { connUserSocketId } = data;
        console.log(
            "on conn init "
            //  getCurrentTimeInMilliseconds()
        );

        // here we are the initiator so we create a new peer connection
        prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on("conn-signal", (data) => {
        // console.log(
        //     "on conn-signal"
        //     // getCurrentTimeInMilliseconds()
        // );
        handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
        console.log("on room-participant-left");
        handleParticipantLeftRoom(data.connUserSocketId);
        if (!data.isGroup) {
            dispatch(emptyRoom());
        }
    });
};

export const signalPeerData = (data: any) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("conn-signal", data);
};
