import {
    closeAllConnections,
    setLocalStream,
    setRemoteStreams,
} from "./../realtimeCommunication/webRTCHandler";
import { getLocalStream } from "../realtimeCommunication/webRTCHandler";
import { toggleSidebar } from "../redux/features/slices/otherSlice";
import {
    setRoomDetails,
    setRoomState,
} from "../redux/features/slices/roomSlice";
import { store } from "../redux/store";
import settings from "./settings";
import { getCurrentTimeInMilliseconds } from "./other";
import { stopScreenSharing } from "../realtimeCommunication/screenShareHandler";
import { leaveRoom } from "../realtimeCommunication/socketHandlers/rooms";
const md = settings.md;

export const leaveRoomHandler = (windowWidth?: number) => {
    const roomid = store.getState().room.roomDetails?.roomid;
    if (!roomid) return;
    store.dispatch(
        setRoomState({
            isUserInRoom: false,
            isUserRoomCreator: false,
        })
    );
    store.dispatch(setRoomDetails(null));
    if (windowWidth && windowWidth < md) {
        store.dispatch(toggleSidebar());
    }

    const localStream = getLocalStream();

    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        // dispatch(setLocalStream(null));
        setLocalStream(null);
    }

    setRemoteStreams([]);
    stopScreenSharing();

    closeAllConnections();

    // console.log("roomid", roomid);
    if (roomid) {
        leaveRoom(roomid);
        // console.log("l1", getCurrentTimeInMilliseconds());
    }
};
