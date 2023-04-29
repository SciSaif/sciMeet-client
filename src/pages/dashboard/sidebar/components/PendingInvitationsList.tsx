import { useGetFriendsInvitationsQuery } from "../../../../redux/features/apis/friendApi";
import PendingInvitationListItem from "./PendingInvitationListItem";

const PendingInvitationsList = () => {
    const { data } = useGetFriendsInvitationsQuery();
    console.log(data);
    return (
        <div className="">
            <h4 className="text-textGray2 text-sm text-center w-full mt-3 font-semibold">
                INVITATIONS
            </h4>

            <div className="mt-4 pl-4 grid gap-y-2">
                {data?.map((invitation) => (
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
