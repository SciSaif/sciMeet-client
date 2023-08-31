import { store } from "../redux/store";
import Peer from "simple-peer";
import { signalPeerData } from "./socketHandler";
import {
    toggleLocalStreamChanged,
    toggleRemoteStreamsChanged,
    toggleScreenShareChanged,
} from "../redux/features/slices/roomSlice";
import { getCurrentTimeInMilliseconds } from "../utils/other";

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
        console.log("remoteStreams", remoteStreams);
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
    if (screenSharingStream) {
        replaceStreams(screenSharingStream);
    }
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
        store.dispatch(toggleScreenShareChanged()); // for rerendering
    }
};
const constraints = {
    audio: false,
    video: true,
};

export const toggleScreenShare = async () => {
    let stream = null;
    if (screenSharingStream) {
        stopScreenSharing();
        stream = localStream;
        store.dispatch(toggleScreenShareChanged()); //for rerendering
    } else {
        try {
            stream = await navigator.mediaDevices.getDisplayMedia(constraints);

            screenSharingStream = stream;
            store.dispatch(toggleScreenShareChanged()); //for rerendering
        } catch (e: unknown) {
            console.error(
                "error when trying to get an access to screen share stream",
                e
            );
        }
    }

    if (!stream) return false;

    replaceStreams(stream);

    // for every socket_id in peers

    if (screenSharingStream) {
        return true;
    } else return false;
};

function replaceStreams(newStream: MediaStream) {
    for (let socket_id in peers) {
        console.log("___socket_id___", socket_id);
        // replace the track of the stream with the new stream
        for (let index in peers[socket_id].streams[0].getTracks()) {
            console.log("index1", index);
            for (let index2 in newStream.getTracks()) {
                console.log("index2", index2);
                console.log(
                    "peers[socket_id].streams",
                    peers[socket_id].streams
                );
                console.log(
                    "tracks peer",
                    peers[socket_id].streams[0].getTracks()
                );
                console.log("tracks stream", newStream.getTracks());

                // in remoteStream there are 2 probably 2 tracks, audio and video
                // in screensharingStream there is only 1 track, video
                // so for each track of same kind we replace track
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    newStream.getTracks()[index2].kind
                ) {
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
