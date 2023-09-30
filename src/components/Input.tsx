import { InputHTMLAttributes, useId, forwardRef, Ref } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props
    extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
}

const Input = (
    { type, label, error, className, ...rest }: Props,
    ref: Ref<HTMLInputElement>
) => {
    const id = useId();

    return (
        <>
            <label
                htmlFor={id}
                className={twMerge(
                    `autofill:bg-red-500 relative block overflow-hidden rounded-md border ${
                        error
                            ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600 dark:border-red-600"
                            : "border-gray-200 focus-within:border-blue-600 focus-within:ring-blue-600 dark:border-gray-700"
                    }   shadow-sm  focus-within:ring-1   dark:bg-gray-800/25 `,

                    className
                )}
            >
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    placeholder={label}
                    {...rest}
                    className={twMerge(
                        `peer px-3 pt-4 h-11 w-full border-none bg-transparent  placeholder-transparent  focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm dark:autofill:!text-green-500  dark:autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.2)]`
                    )}
                />

                <span className="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
                    {label}
                </span>
            </label>
            {error && <p className="text-red-500 text-xs ">{error.message}</p>}
        </>
    );
};

// wrap in forwardRef to allow for ref to be passed
export default forwardRef(Input);
