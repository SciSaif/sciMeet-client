import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}
const Tab = ({ icon, selected, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "text-white h-full flex justify-center items-center cursor-pointer hover:bg-slate-100/10 rounded-t",
                selected && "bg-slate-100/10"
            )}
        >
            {icon}
        </div>
    );
};

export default Tab;
