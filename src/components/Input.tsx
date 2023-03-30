import { useId } from "react";
import { FieldError } from "react-hook-form";

interface Props {
    type: "text" | "email" | "password";
    label: string;
    name: string;
    register: any;
    error: FieldError | undefined;
}

const Input = ({ type, label, name, register, error }: Props) => {
    const id = useId();

    return (
        <>
            <label
                htmlFor={id}
                className={`relative block overflow-hidden rounded-md border ${
                    error
                        ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600 dark:border-red-600"
                        : "border-gray-200 focus-within:border-blue-600 focus-within:ring-blue-600 dark:border-gray-700"
                } px-3 pt-3 shadow-sm  focus-within:ring-1   dark:bg-gray-800/25 `}
            >
                <input
                    type={type}
                    id={id}
                    placeholder={label}
                    {...register(name)}
                    className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm`}
                />

                <span className="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
                    {label}
                </span>
            </label>
            {error && <p className="text-red-500 text-xs ">{error.message}</p>}
        </>
    );
};

export default Input;
