import { useState, FormEventHandler, ChangeEvent } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { z, ZodIssue } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
});

type FormType = z.infer<typeof Form>;

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver: zodResolver(Form) });

    const submitForm = (data: FormType) => {
        console.log(data);
    };

    // console.log(errors);

    return (
        <div className="flex justify-center  items-center h-screen ">
            <div className="relative overflow-hidden text-black  py-10 px-10 h-[400px] rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
                <h1 className="dark:text-[#8caef2] text-center text-black text-xl font-extrabold  sm:text-2xl">
                    Welcome Back!
                </h1>
                <p className="text-[#b9bbbe] mt-5 mb-10">
                    We are happy that you are with us!
                </p>

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="flex gap-y-2 flex-col"
                >
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        error={errors.password}
                        register={register}
                    />
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        error={errors.email}
                        register={register}
                    />
                    <button type="submit" className="px-5 py-5 text-white">
                        Login
                    </button>
                </form>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    fill="none"
                    className="absolute -bottom-3 -right-3 stroke-[#e8effc] dark:stroke-[#183367]"
                    transform="rotate(180)"
                    viewBox="0 0 128 128"
                >
                    <path
                        strokeWidth="2"
                        d="M73 6a5 5 0 015-5h44a5 5 0 015 5v28a5 5 0 01-5 5H78a5 5 0 01-5-5V6zM73 78a5 5 0 015-5h44a5 5 0 015 5v44a5 5 0 01-5 5H78a5 5 0 01-5-5V78zM1 6a5 5 0 015-5h44a5 5 0 015 5v44a5 5 0 01-5 5H6a5 5 0 01-5-5V6zM1 94a5 5 0 015-5h44a5 5 0 015 5v28a5 5 0 01-5 5H6a5 5 0 01-5-5V94z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default LoginPage;
