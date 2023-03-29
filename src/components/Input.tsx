import { useId } from "react";

interface Props {
    type: "text" | "email" | "password";
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, label, value, onChange }: Props) => {
    const id = useId();

    return (
        <label
            htmlFor={id}
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-"
        >
            <input
                type={type}
                id={id}
                placeholder={label}
                value={value}
                onChange={onChange}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm"
            />

            <span className="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
                {label}
            </span>
        </label>
    );
};

export default Input;
