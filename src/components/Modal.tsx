"use client";
import { useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "../redux/hooks";
import { isModalOpen } from "../redux/features/slices/otherSlice";

interface props {
    children: JSX.Element | JSX.Element[];
    close: () => void;
    closeIcon?: boolean;
    closeOnBackdropClick?: boolean;
    className?: string;
    closeOnBackPress?: boolean;
}

const Modal = ({
    children,
    close,
    closeIcon,
    className,
    closeOnBackdropClick = true,
    closeOnBackPress = true,
}: props) => {
    const dispatch = useAppDispatch();

    // if modal is open then dispatch toggleModalOpen(true) and before closing the modal dispatch toggleModalOpen(false)
    useEffect(() => {
        dispatch(isModalOpen(true));

        return () => {
            dispatch(isModalOpen(false));
        };
    }, []);

    useEffect(() => {
        if (closeOnBackPress) {
            // Push a new state when the modal is opened
            window.history.pushState(null, "");

            // Event listener for the popstate event
            const handleBackButton = () => {
                close();
            };

            window.addEventListener("popstate", handleBackButton);

            // Clean up the event listener when the component is unmounted
            return () => {
                window.removeEventListener("popstate", handleBackButton);
            };
        }
    }, [close, closeOnBackPress]);

    return (
        <>
            <Transition.Root show={true} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 bg-red-500"
                    onClose={() => closeOnBackdropClick && close()}
                >
                    {/* backdrop  */}

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-0 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className={twMerge(
                                        "relative   overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl  ",
                                        className ? className : ""
                                    )}
                                >
                                    {closeIcon && (
                                        <div
                                            className={`absolute
                                         top-0 right-3 z-10 block  pt-4 

                                       
                                       `}
                                        >
                                            <button
                                                type="button"
                                                className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none "
                                                onClick={() => close()}
                                            >
                                                <span className="sr-only">
                                                    Close
                                                </span>
                                                <XMarkIcon
                                                    className="w-6 h-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    )}

                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Modal;
