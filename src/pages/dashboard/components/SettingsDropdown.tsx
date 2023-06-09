import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
    ArrowRightOnRectangleIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SettingsDropdown = () => {
    return (
        <Menu as="div" className="relative inline-block text-left h-full">
            <div className="flex items-center h-full">
                <Menu.Button className="inline-flex w-full justify-center rounded-full  bg-opacity-20 p-3 text-sm font-medium hover:bg-black/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon width={20} />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/"
                                    className={`${
                                        active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                    } group gap-x-2 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <HomeIcon width={20} />
                                    Home
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/logout"
                                    className={`${
                                        active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                    } group gap-x-2 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <ArrowRightOnRectangleIcon width={20} />
                                    Logout
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default SettingsDropdown;
