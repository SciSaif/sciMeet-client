import React from "react";
import {
    ActiveRoom,
    setRoomDetails,
    setRoomState,
} from "../../../../redux/features/slices/roomSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { joinRoom } from "../../../../realtimeCommunication/socketHandler";
import { getLocalStreamPreview } from "../../../../realtimeCommunication/webRTCHandler";

interface Props {
    room: ActiveRoom;
}

const ActiveRoomButton = ({ room }: Props) => {
    const numberOfParticipants = room.participants.length;
    const dispatch = useAppDispatch();
    const activeRoomButtonDisabled = numberOfParticipants > 3;

    const handleJoin = () => {
        if (numberOfParticipants < 4) {
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
