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
        setLocalStream(null);
    }

    setRemoteStreams([]);
    stopScreenSharing();

    closeAllConnections();

    if (roomid) {
        leaveRoom(roomid);
    }
};
