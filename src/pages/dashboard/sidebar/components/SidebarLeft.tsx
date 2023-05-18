import { PlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { createNewRoom } from "../../../../redux/features/slices/roomSlice";

const SidebarLeft = () => {
    const dispatch = useDispatch();

    const handleAddRoom = () => {
        dispatch(createNewRoom());
    };

    return (
        <>
            {" "}
            <div className="bg-transparent h-screen w-24 px-2 py-4 flex flex-col  gap-y-2">
                <div className="w-full h-16 text-white bg-primaryAccent  rounded-2xl flex justify-center items-center">
                    {/* <UserGroupIcon width={20} /> */}
                    <UsersIcon width={30} />
                </div>
                <button
                    onClick={handleAddRoom}
                    className="w-full h-16 text-white bg-blue-500 hover:bg-blue-600  rounded-2xl flex justify-center items-center"
                >
                    {/* <UserGroupIcon width={20} /> */}
                    <PlusIcon width={30} />
                </button>
            </div>
        </>
    );
};

export default SidebarLeft;
