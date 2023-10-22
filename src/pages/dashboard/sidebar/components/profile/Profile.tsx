import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import PersonalProfile from "./PersonalProfile";
import GroupProfile from "./GroupProfile";
import { setProfile } from "../../../../../redux/features/slices/otherSlice";
import FriendProfile from "./FriendProfile";

const Profile = () => {
    const profile = useAppSelector((state) => state.other.profile);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const profileType = profile.type;
    if (profileType === "closed") return null;
    return (
        <div className="h-screen absolute top-0 bg-slate-800 w-full ">
            <div
                onClick={() => dispatch(setProfile({ type: "closed" }))}
                className="text-text h-10 items-center justify-center text-center w-full flex py-6 cursor-pointer hover:bg-black/20 bg-black/10"
            >
                <div>Close</div>
            </div>
            {profileType === "personal" && <PersonalProfile />}
            {profileType === "group" && <GroupProfile />}
            {profileType === "friend" && <FriendProfile />}
        </div>
    );
};

export default Profile;
