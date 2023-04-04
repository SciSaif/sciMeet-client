import React from "react";

const Sidebar = () => {
    return (
        <div
            className={` h-screen w-[calc(100%-60px)] md:w-[400px] transition-all  absolute md:top-0 md:left-0 flex flex-row gap-1 `}
        >
            <div className="bg-transparent h-screen w-24 px-2 py-4">
                <div className="w-full h-16 bg-primaryAccent  rounded-2xl"></div>
            </div>
            <div className="bg-secondaryDark h-screen w-full rounded-lg mr-2 py-4">
                <div className="px-4 h-full grid grid-rows-[min-content_2fr_1fr]">
                    <button className="inline-block rounded bg-primaryAccent px-8 py-2 text-sm w-full font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring focus:ring-primaryAccent active:bg-primaryAccentLighter">
                        Add Friend
                    </button>
                    <div className="">
                        <h4 className="text-textGray2 text-sm text-center w-full mt-3 font-semibold">
                            PRIVATE MESSAGES
                        </h4>
                    </div>
                    <div className="">
                        <h4 className="text-textGray2 text-sm text-center w-full mt-3 font-semibold">
                            INVITATIONS
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
