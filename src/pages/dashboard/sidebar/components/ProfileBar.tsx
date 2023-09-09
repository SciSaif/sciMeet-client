import React from "react";
import { useAppSelector } from "../../../../redux/hooks";

const ProfileBar = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div
            className={`w-full px-2 py-2 pb-3 group items-center  bg-black/25 rounded-lg   flex justify-between `}
        >
            <div className="flex flex-row items-center gap-x-2 h-full">
                <div className="flex rounded-full relative group-hover:rotate-6">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={user?.avatar ? user.avatar : "avatars/pikachu.png"}
                        alt="dp"
                    />
                    <div className="absolute h-3 w-3 rounded-full  bg-primary bottom-0 right-0 ">
                        <div className=" absolute rounded-full bottom-1/2 right-1/2 translate-x-1/2  translate-y-1/2 bg-green-500 h-[7px] w-[7px] "></div>
                    </div>
                </div>
                <div className="text-white/80">
                    <div>{user?.username}</div>
                    <div className="text-xs text-textGray">Online</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileBar;
