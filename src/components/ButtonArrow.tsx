import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const ButtonArrow = ({ type, children, className, onClick }: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(
                "group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500",
                className ? className : ""
            )}
        >
            <span className="text-sm font-medium transition-all group-hover:mr-4">
                {children}
            </span>
        </button>
    );
};

export default ButtonArrow;
