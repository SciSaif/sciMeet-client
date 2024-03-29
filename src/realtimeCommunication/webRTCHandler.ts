import { store } from "../redux/store";
import Peer from "simple-peer";
import {
    toggleLocalStreamChanged,
    toggleRemoteStreamsChanged,
} from "../redux/features/slices/roomSlice";
import { getCurrentTimeInMilliseconds } from "../utils/other";
import { shareScreenWithNewRemoteStream } from "./screenShareHandler";
import { signalPeerData } from "./socketHandlers/webRTC";

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

// function to give get Video permission as well if only audio permission is given before
// refresh the localStream with video permission as well
export const getVideoPermission = async () => {
    const constraints = defaultConstraints;

    try {
        const newStream = await navigator.mediaDevices.getUserMedia(
            constraints
        );

        // TODO: replaceStreams
        // Update existing peer connections with the new stream

        localStream = newStream;
        replaceStreams(newStream);

        // Update localStream and trigger the necessary changes
        store.dispatch(toggleLocalStreamChanged());
    } catch (err) {
        console.log(err);
        console.log("Cannot get access to local stream");
    }
};

export function replaceStreams(newStream: MediaStream) {
    let peers = getPeers();
    for (let socket_id in peers) {
        // replace the track of the stream with the new stream
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in newStream.getTracks()) {
                // Check if the track kinds match
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    newStream.getTracks()[index2].kind
                ) {
                    // Replace the track in the existing stream
                    peers[socket_id].streams[0].getTracks()[index].stop();
                    peers[socket_id].streams[0].getTracks()[index] =
                        newStream.getTracks()[index2];
                    console.log("replaced track");

                    // Trigger the 'replaceTrack' method on the Peer
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        newStream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
}

let peers = <
    {
        [connUserSocketId: string]: Peer.Instance;
    }
>{};

export const getPeers = () => {
    return peers;
};

export const prepareNewPeerConnection = async (
    connUserSocketId: string,
    isInitiator: boolean
) => {
    if (!localStream) return;

    if (isInitiator) {
        console.log(
            "preparing new peer connection as initiator"
            // getCurrentTimeInMilliseconds()
        );
    } else {
        console.log(
            "preparing new peer connection as receiver"
            // getCurrentTimeInMilliseconds()
        );
    }

    const response = await fetch(
        "https://scimeet.metered.live/api/v1/turn/credentials?apiKey=10ef8a6a4f7d190368963d9362b79daf56fa"
    );

    // Saving the response in the iceServers array
    const iceServers = await response.json();

    // console.log(iceServers);

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

        // console.log("singal", signalData.signal);

        // console.log("on peer signal", getCurrentTimeInMilliseconds());

        // send signal to the other peer
        signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (remoteStream) => {
        console.log("remote stream came from other user");
        console.log(
            "direct connection has been established"
            // getCurrentTimeInMilliseconds()
        );
        // @ts-ignore
        remoteStream.connUsersocketId = connUserSocketId;

        addNewRemoteStream(remoteStream);
        // console.log("remoteStreams", remoteStreams);
    });
};

export const handleSignalingData = (data: any) => {
    const { signal, connUserSocketId } = data;

    // console.log("signalling now", getCurrentTimeInMilliseconds());

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};

export const addNewRemoteStream = (remoteStream: MediaStream) => {
    const newRemoteStreams = [...remoteStreams, remoteStream];

    remoteStreams = newRemoteStreams;
    // if screenshare is on then replace stream
    shareScreenWithNewRemoteStream();

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
