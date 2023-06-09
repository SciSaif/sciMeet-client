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
            <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </span>
            <span className="text-sm font-medium transition-all group-hover:mr-4">
                {children}
            </span>
        </button>
    );
};

export default ButtonArrow;
