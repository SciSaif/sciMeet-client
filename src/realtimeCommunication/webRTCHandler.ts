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
    toggleScreenShareChanged,
} from "../redux/features/slices/roomSlice";

// const getConfiguration = () => {
//     const turnIceServers = null;

//     if (!turnIceServers) {
//         console.warn("Using only STUN server");
//     } else {
//         return {
//             iceServers: [
//                 {
//                     urls: "stun:stun.l.google.com:19302",
//                 },
//             ],
//         };
//     }
// };
const getConfiguration = async () => {
    // Calling the REST API TO fetch the TURN Server Credentials
    const response = await fetch(
        "https://scimeet.metered.live/api/v1/turn/credentials?apiKey=10ef8a6a4f7d190368963d9362b79daf56fa"
    );

    // Saving the response in the iceServers array
    const iceServers = await response.json();

    console.log(iceServers);

    return iceServers;

    // const turnIceServers = [
    //     {
    //         urls: "stun:stun.l.google.com:19302",
    //     },
    //     {
    //         urls: "turn:turn.l.google.com:19302",
    //     },
    // ];

    // if (!turnIceServers) {
    //     console.warn("Using only STUN server");
    // } else {
    //     return {
    //         iceServers: turnIceServers,
    //     };
    // }
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

export const prepareNewPeerConnection = async (
    connUserSocketId: string,
    isInitiator: boolean
) => {
    if (!localStream) return;

    if (isInitiator) {
        console.log("preparing new peer connection as initiator");
    } else {
        console.log("preparing new peer connection as receiver");
    }

    const response = await fetch(
        "https://scimeet.metered.live/api/v1/turn/credentials?apiKey=10ef8a6a4f7d190368963d9362b79daf56fa"
    );

    // Saving the response in the iceServers array
    const iceServers = await response.json();

    console.log(iceServers);

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        // config: getConfiguration(),
        config: {
            iceServers: iceServers,
        },
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
    console.log("handleParticipantLeftRoom", connUserSocketId);
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId];
    }

    const newRemoteStreams = remoteStreams.filter(
        // @ts-ignore
        (stream) => stream.connUsersocketId !== connUserSocketId
    );

    remoteStreams = newRemoteStreams;
    console.log("newremoteStreams", remoteStreams);
    store.dispatch(toggleRemoteStreamsChanged());
};

let screenSharingStream: MediaStream | null = null;

export const getScreenSharingStream = () => {
    return screenSharingStream;
};

export const stopScreenSharing = () => {
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
        screenSharingStream = null;
        store.dispatch(toggleScreenShareChanged());
    }
};

export const switchOutgoingTracks = (
    stream: MediaStream,
    isLocalStream: boolean = false
) => {
    if (!isLocalStream) {
        screenSharingStream = stream;
        store.dispatch(toggleScreenShareChanged());
    }
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    stream.getTracks()[index2].kind
                ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
};
