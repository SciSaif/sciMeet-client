import React from "react";
import Logo from "../assets/Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import ProfileDropdown from "./ProfileIcon";

const Navbar = () => {
    return (
        <nav
            aria-label="Site Nav"
            className="fixed  flex w-full  items-center justify-center p-4"
        >
            <div className="flex items-center justify-between w-full md:w-3/4 lg:w-2/3">
                <a
                    href="/"
                    className="flex  h-10  items-center  rounded-lg group/logo hover:min-w-[150px]"
                >
                    <div className="h-10 w-10 flex items-center justify-center mr-2 group-hover/logo:-rotate-3">
                        <Logo />{" "}
                    </div>
                    <span className="bg-gradient-to-r from-blue-500 via-gray-900 dark:via-white to-blue-500 dark:to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-2xl text-black   transition-all group-hover/logo:text-xl  group-hover/logo:from-gray-900 group-hover/logo:via-blue-500 group-hover/logo:to-gray-900 dark:group-hover/logo:from-white dark:group-hover/logo:via-blue-500 dark:group-hover/logo:to-white">
                        SciMeet
                    </span>
                </a>

                <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <li className="flex items-center mr-2">
                        <ProfileDropdown />
                    </li>

                    <li>
                        <ThemeToggleButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
