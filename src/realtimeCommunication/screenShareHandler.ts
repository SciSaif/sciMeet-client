import { toggleScreenShareChanged } from "../redux/features/slices/roomSlice";
import { store } from "../redux/store";
import { getLocalStream, getPeers } from "./webRTCHandler";

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
        stream = getLocalStream();
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
    let peers = getPeers();
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

export const shareScreenWithNewRemoteStream = () => {
    if (screenSharingStream) {
        replaceStreams(screenSharingStream);
    }
};
