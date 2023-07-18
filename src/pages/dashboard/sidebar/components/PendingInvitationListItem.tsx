import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
    Invitation,
    useAcceptInvitationMutation,
    useRejectInvitationMutation,
} from "../../../../redux/features/apis/friendApi";

const PendingInvitationListItem = ({
    invitation,
}: {
    invitation: Invitation;
}) => {
    const [rejectInvitation] = useRejectInvitationMutation();
    const [acceptInvitation] = useAcceptInvitationMutation();

    // console.log("invitation", invitation);
    return (
        <div className="w-full cursor-pointer items-center  rounded-l-full  flex justify-between h-10">
            <div className="flex flex-row items-center gap-x-2">
                <div className="flex rounded-full ">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${invitation.senderId.username}&&background=16D162`}
                        alt=""
                    />
                </div>
                <div className="text-textGray2">
                    {invitation.senderId.username}
                </div>
            </div>
            <div className="flex flex-row">
                <button
                    onClick={() => acceptInvitation({ _id: invitation._id })}
                    className="text-textGray2 rounded-full p-1 mr-2 hover:bg-black/25"
                >
                    <CheckIcon width={24} height={24} />
                </button>
                <button
                    onClick={() => rejectInvitation({ _id: invitation._id })}
                    className="text-textGray2 rounded-full p-1 mr-2 hover:bg-black/25"
                >
                    <XMarkIcon width={24} height={24} />
                </button>
            </div>
        </div>
    );
};

export default PendingInvitationListItem;
