// import {
//     setLocalStream,
//     setRemoteStreams,
// } from "../redux/features/slices/roomSlice";
import { store } from "../redux/store";
import Peer from "simple-peer";
import { signalPeerData } from "./socketHandler";
import {
    toggleLocalStreamChanged,
    toggleRemoteStreamsChanged,
} from "../redux/features/slices/roomSlice";

const getConfiguration = () => {
    const turnIceServers = null;

    if (!turnIceServers) {
        console.warn("Using only STUN server");
    } else {
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        };
    }
};

const onlyAudioConstraints = {
    video: false,
    audio: true,
};

const defaultConstraints = {
    video: true,
    audio: true,
};

let localStream: MediaStream | null = null;
let remoteStreams: MediaStream[] = [];

export const getLocalStream = () => {
    return localStream;
};

export const getRemoteStreams = () => {
    return remoteStreams;
};

export const setLocalStream = (stream: MediaStream | null) => {
    localStream = stream;
    store.dispatch(toggleLocalStreamChanged());
};

export const setRemoteStreams = (streams: MediaStream[]) => {
    remoteStreams = streams;
    store.dispatch(toggleRemoteStreamsChanged());
};

export const getLocalStreamPreview = (
    onlyAudio: boolean = false,
    callbackFunc: () => void
) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            localStream = stream;
            store.dispatch(toggleLocalStreamChanged());

            callbackFunc();
        })
        .catch((err) => {
            console.log(err);
            console.log("Cannot get an access to local stream");
        });
};

let peers = <
    {
        [connUserSocketId: string]: Peer.Instance;
    }
>{};

export const prepareNewPeerConnection = (
    connUserSocketId: string,
    isInitiator: boolean
) => {
    if (!localStream) return;

    if (isInitiator) {
        console.log("preparing new peer connection as initiator");
    } else {
        console.log("preparing new peer connection as receiver");
    }

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream,
    });

    peers[connUserSocketId].on("signal", (signal) => {
        // console.log("signal", signal);
        const signalData = {
            signal,
            connUserSocketId,
        };

        // send signal to the other peer
        signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (remoteStream) => {
        console.log("remote stream came from other user");
        console.log("direct connection has been established");
        // @ts-ignore
        remoteStream.connUsersocketId = connUserSocketId;

        addNewRemoteStream(remoteStream);
        //TODO add new remote stream to our server store
    });
};

export const handleSignalingData = (data: any) => {
    const { signal, connUserSocketId } = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};

export const addNewRemoteStream = (remoteStream: MediaStream) => {
    const newRemoteStreams = [...remoteStreams, remoteStream];

    remoteStreams = newRemoteStreams;
    store.dispatch(toggleRemoteStreamsChanged());
};

export const closeAllConnections = () => {
    Object.entries(peers).forEach(([connUserSocketId, peer]) => {
        peer.destroy();
        delete peers[connUserSocketId];
    });
};

export const handleParticipantLeftRoom = (connUserSocketId: string) => {
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId];
    }

    const newRemoteStreams = remoteStreams.filter(
        // @ts-ignore
        (stream) => stream.connUsersocketId !== connUserSocketId
    );

    remoteStreams = newRemoteStreams;
    store.dispatch(toggleRemoteStreamsChanged());
};
