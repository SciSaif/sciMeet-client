import { useAppSelector } from "../../../../../redux/hooks";
import PendingInvitationListItem from "./PendingInvitationListItem";

// const invitations: any[] = [
//     {
//         _id: "1",
//         receiverId: "receiver1",
//         senderId: {
//             email: "sender1@example.com",
//             username: "sender1",
//             avatar: "avatar1.jpg",
//         },
//     },
//     {
//         _id: "2",
//         receiverId: "receiver2",
//         senderId: {
//             email: "sender2@example.com",
//             username: "sender2",
//             avatar: "avatar2.jpg",
//         },
//     },
//     {
//         _id: "3",
//         receiverId: "receiver3",
//         senderId: {
//             email: "sender3@example.com",
//             username: "sender3",
//             avatar: "avatar3.jpg",
//         },
//     },
//     {
//         _id: "4",
//         receiverId: "receiver4",
//         senderId: {
//             email: "sender4@example.com",
//             username: "sender4",
//         },
//     },
//     {
//         _id: "5",
//         receiverId: "receiver5",
//         senderId: {
//             email: "sender5@example.com",
//             username: "sender5",
//             avatar: "avatar5.jpg",
//         },
//     },
//     {
//         _id: "6",
//         receiverId: "receiver6",
//         senderId: {
//             email: "sender6@example.com",
//             username: "sender6",
//         },
//     },
//     {
//         _id: "7",
//         receiverId: "receiver7",
//         senderId: {
//             email: "sender7@example.com",
//             username: "sender7",
//             avatar: "avatar7.jpg",
//         },
//     },
//     {
//         _id: "8",
//         receiverId: "receiver8",
//         senderId: {
//             email: "sender8@example.com",
//             username: "sender8",
//         },
//     },
//     {
//         _id: "9",
//         receiverId: "receiver9",
//         senderId: {
//             email: "sender9@example.com",
//             username: "sender9",
//             avatar: "avatar9.jpg",
//         },
//     },
//     {
//         _id: "10",
//         receiverId: "receiver10",
//         senderId: {
//             email: "sender10@example.com",
//             username: "sender10",
//             avatar: "avatar10.jpg",
//         },
//     },
// ];

const PendingInvitationsList = () => {
    const invitations = useAppSelector((state) => state.friend.invitations);
    return (
        <div className="border-t border-slate-100/25 mt-5">
            <h4 className="text-text2 pb-2  text-center w-full mt-3 font-semibold">
                Friend Invitations
            </h4>
            {invitations && invitations.length > 0 && (
                <div className=" mb-5 max-h-[200px] overflow-auto scrollbar">
                    <div className="mt-4 pl-4 grid gap-y-2">
                        {invitations?.map((invitation) => (
                            <PendingInvitationListItem
                                key={invitation._id}
                                invitation={invitation}
                            />
                        ))}

                        {}
                    </div>
                </div>
            )}

            {invitations?.length === 0 && (
                <div className="text-text text-sm w-full text-center">
                    No friend requests
                </div>
            )}
        </div>
    );
};

export default PendingInvitationsList;
