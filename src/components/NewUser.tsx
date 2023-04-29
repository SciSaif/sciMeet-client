import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useSetUsernameMutation } from "../redux/features/apis/authApi";
import ButtonPop from "./ButtonPop";

const Form = z.object({
    // userName should not contain spaces
    userName: z
        .string()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z0-9]+$/, { message: "No spaces allowed" }),
});

type FormType = z.infer<typeof Form>;

const NewUser = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const [setUserName, { error, isSuccess }] = useSetUsernameMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver: zodResolver(Form) });

    useEffect(() => {
        // if user is not new user, redirect to dashboard
        if (!user?.newUser) {
            navigate("/dashboard");
        }
    }, [user]);

    const submit = async (data: FormType) => {
        try {
            await setUserName(data.userName).unwrap();
            navigate("/dashboard");
        } catch (e) {}
    };

    return (
        <div className="flex pt-[75px]  justify-center  items-center min-h-screen ">
            <div className="relative overflow-hidden text-black bg-white/75 dark:bg-transparent py-10 px-10   rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
                {/* choose a userName */}
                <h1 className="dark:text-[#8caef2] text-center text-black text-xl font-extrabold  sm:text-2xl">
                    Choose a username
                </h1>
                <form
                    onSubmit={handleSubmit(submit)}
                    className="flex gap-y-2 flex-col mb-24 mt-5"
                >
                    <Input
                        type="username"
                        label="Username"
                        error={errors.userName}
                        {...register("userName")}
                    />

                    {error && "data" in error && (
                        <div className="text-white text-bold w-full px-2 py-1 rounded bg-red-500">
                            {(error.data as { message: string })?.message}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="text-primaryGreen text-bold w-full px-2 py-1 rounded bg-green-400 text-white">
                            Username set successfully
                        </div>
                    )}

                    <ButtonPop type="submit" className="mt-5 z-10 ">
                        {" "}
                        Go{" "}
                    </ButtonPop>
                </form>
            </div>
        </div>
    );
};

export default NewUser;
