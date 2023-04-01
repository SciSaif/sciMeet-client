import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const ButtonPop = ({
    children,
    onClick,
    className,
    type = "button",
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(
                "inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500",
                className ? className : ""
            )}
        >
            {children}
        </button>
    );
};

export default ButtonPop;
