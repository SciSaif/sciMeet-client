import React, { useRef } from "react";
import {
    ActiveRoom,
    setRoomDetails,
    setRoomState,
} from "../../../../redux/features/slices/roomSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { joinRoom } from "../../../../realtimeCommunication/socketHandler";
import { getLocalStreamPreview } from "../../../../realtimeCommunication/webRTCHandler";
import { toggleSidebar } from "../../../../redux/features/slices/otherSlice";
import { leaveRoomHandler } from "../../../../utils/roomUtils";
import { getCurrentTimeInMilliseconds } from "../../../../utils/other";

interface Props {
    room: ActiveRoom;
}

const ActiveRoomButton = ({ room }: Props) => {
    const windowWidth = useRef(window.innerWidth);
    const numberOfParticipants = room.participants.length;
    const dispatch = useAppDispatch();
    const activeRoomButtonDisabled = numberOfParticipants > 3;
    const currentRoomId = useAppSelector(
        (state) => state.room.roomDetails?.roomid
    );

    const handleJoin = () => {
        if (currentRoomId === room.roomid) return;

        if (numberOfParticipants < 4) {
            // if user is already in a room, exit
            leaveRoomHandler();
            // console.log("l2", getCurrentTimeInMilliseconds());

            // join room
            const successCallbackFunc = () => {
                dispatch(setRoomDetails(room));
                dispatch(
                    setRoomState({
                        isUserInRoom: true,
                        isUserRoomCreator: false,
                    })
                );
                joinRoom(room.roomid);

                if (windowWidth.current < 768) {
                    dispatch(toggleSidebar());
                }
            };

            getLocalStreamPreview(false, successCallbackFunc);
        }
    };

    const roomTitle = `Creator: ${room.roomCreator.username}. Connected: ${numberOfParticipants}`;

    return (
        <button
            // disabled={activeRoomButtonDisabled }
            onClick={handleJoin}
            className="w-full h-16 text-4xl text-white bg-secondary hover:bg-secondary-600  rounded-2xl flex justify-center items-center"
        >
            <span className="-translate-y-[4px]">
                {room.roomCreator.username?.slice(0, 2)}
            </span>
        </button>
    );
};

export default ActiveRoomButton;
