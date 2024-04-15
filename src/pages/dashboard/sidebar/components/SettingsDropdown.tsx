import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
    ArrowRightOnRectangleIcon,
    HomeIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import NewGroupModal from "./groups/NewGroupModal";
import { BotMessageSquare } from "lucide-react";
import NewBotModal from "./bots/NewBotModal";

const SettingsDropdown = () => {
    const [newGroupModal, setNewGroupModal] = useState(false);
    const [newBotModal, setNewBotModal] = useState(false);

    return (
        <Menu as="div" className="relative inline-block    text-left h-full">
            <div className="flex items-center h-full">
                <Menu.Button className="inline-flex w-full justify-center rounded-full  bg-opacity-20 p-3 text-sm font-medium hover:bg-black/10 text-text1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                <Menu.Items className="absolute right-0 z-10  mt-2 w-56 origin-top-right divide-y divide-gray-100/50 rounded-md bg-primary-600  text-white shadow shadow-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => setNewBotModal(true)}
                                    className={`${
                                        active
                                            ? "bg-slate-500 text-white"
                                            : "text-white "
                                    } group gap-x-2 cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <BotMessageSquare size={20} />
                                    New Bot
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => setNewGroupModal(true)}
                                    className={`${
                                        active
                                            ? "bg-slate-500 text-white"
                                            : "text-white "
                                    } group gap-x-2 cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <UserGroupIcon width={20} />
                                    New Group
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/"
                                    className={`${
                                        active
                                            ? "bg-slate-500 text-white"
                                            : "text-white "
                                    } group gap-x-2 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <HomeIcon width={20} />
                                    Home
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1 text-white ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/logout"
                                    className={`${
                                        active
                                            ? "bg-slate-500 text-white"
                                            : "text-white"
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

            {newGroupModal && (
                <NewGroupModal close={() => setNewGroupModal(false)} />
            )}

            {newBotModal && <NewBotModal close={() => setNewBotModal(false)} />}
        </Menu>
    );
};

export default SettingsDropdown;
