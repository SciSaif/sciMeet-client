import { useAppSelector } from "../../../../redux/hooks";
import PendingInvitationListItem from "./PendingInvitationListItem";

const PendingInvitationsList = () => {
    const invitations = useAppSelector((state) => state.friend.invitations);
    return (
        <div className="">
            <h4 className="text-textGray2 text-sm text-center w-full mt-3 font-semibold">
                INVITATIONS
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {invitations?.map((invitation) => (
                    <PendingInvitationListItem
                        key={invitation._id}
                        invitation={invitation}
                    />
                ))}
            </div>
        </div>
    );
};

export default PendingInvitationsList;
