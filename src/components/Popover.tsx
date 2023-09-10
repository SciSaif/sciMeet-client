import React, { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Popover as PopoverHeadless, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
interface Props {
    children: JSX.Element | JSX.Element[];
    popup: JSX.Element | JSX.Element[];
    className?: string;
}

const Popover = ({ children, popup, className }: Props) => {
    return (
        <PopoverHeadless className="relative">
            {({ open }) => (
                <>
                    <PopoverHeadless.Button
                        className={`
      ${open ? "" : "text-opacity-90"}
      group inline-flex items-center     focus:outline-none `}
                    >
                        {children}
                    </PopoverHeadless.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverHeadless.Panel
                            className={twMerge(
                                "absolute -top-1/2   z-10 mt-1   -translate-x-[100%] transform ",
                                className && className
                            )}
                        >
                            {popup}
                        </PopoverHeadless.Panel>
                    </Transition>
                </>
            )}
        </PopoverHeadless>
    );
};

export default Popover;
