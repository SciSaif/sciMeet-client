import React from "react";

const Sidebar = () => {
    return (
        <div
            className={` h-screen w-[calc(100%-60px)] md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            <div className="bg-transparent h-screen w-[100px]"></div>
            <div className="bg-secondaryDark h-screen w-full rounded-lg mr-2 "></div>
        </div>
    );
};

export default Sidebar;
