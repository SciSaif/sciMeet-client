import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonPop from "../../components/ButtonPop";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useRegisterMutation } from "../../redux/features/apis/authApi";
import ALreadyLoggedIn from "../../components/ALreadyLoggedIn";

const Form = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(12),
        confirmPassword: z.string().min(6).max(12),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type FormType = z.infer<typeof Form>;

const RegisterPage = () => {
    const user = useAppSelector((state) => state.auth.user);

    const [signup, { isLoading: loadingRegister, error, isSuccess }] =
        useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver: zodResolver(Form) });

    const handleLogin = (data: FormType) => {
        console.log(data);
        signup(data)
            .unwrap()
            .then((res) => {
                console.log(":res:", res);
            });
    };

    return (
        <div className="flex pt-[75px]  justify-center  items-center min-h-screen ">
            {user && user.token ? (
                <ALreadyLoggedIn />
            ) : (
                <div className="relative overflow-hidden text-black bg-white/75 dark:bg-transparent py-10 px-10   rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
                    <h1 className="dark:text-[#8caef2] text-center text-black text-xl font-extrabold  sm:text-2xl">
                        Create an account now!
                    </h1>
                    <p className="text-[#b9bbbe] mt-5 mb-10">
                        We are happy that you are with us!
                    </p>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="flex gap-y-2 flex-col mb-24"
                    >
                        <Input
                            type="email"
                            label="Email"
                            error={errors.email}
                            {...register("email")}
                        />
                        <Input
                            type="password"
                            label="Password"
                            error={errors.password}
                            {...register("password")}
                        />
                        <Input
                            type="password"
                            label="Confirm Password"
                            error={errors.confirmPassword}
                            {...register("confirmPassword")}
                        />

                        {error && "error" in error && (
                            <div className="text-white text-bold w-full px-2 py-1 rounded bg-red-500">
                                {error.error}
                            </div>
                        )}

                        {isSuccess && (
                            <div className="text-primaryGreen text-bold w-full px-2 py-1 rounded bg-green-400 text-white">
                                A verification link has been sent to your email
                            </div>
                        )}

                        <ButtonPop type="submit" className="mt-5 z-10 ">
                            {" "}
                            Register{" "}
                        </ButtonPop>

                        {/* create an account link  */}
                        <div className="flex justify-center text-xs items-center mt-5">
                            <p className="text-[#b9bbbe] ">
                                Already have an account?
                            </p>
                            <Link to="/login">
                                <p className="text-blue-500  ml-1">Login</p>
                            </Link>
                        </div>
                    </form>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        fill="none"
                        className="absolute -bottom-3 -right-3 stroke-[#e8effc] dark:stroke-[#183367] z-0"
                        transform="rotate(180)"
                        viewBox="0 0 128 128"
                    >
                        <path
                            strokeWidth="2"
                            d="M73 6a5 5 0 015-5h44a5 5 0 015 5v28a5 5 0 01-5 5H78a5 5 0 01-5-5V6zM73 78a5 5 0 015-5h44a5 5 0 015 5v44a5 5 0 01-5 5H78a5 5 0 01-5-5V78zM1 6a5 5 0 015-5h44a5 5 0 015 5v44a5 5 0 01-5 5H6a5 5 0 01-5-5V6zM1 94a5 5 0 015-5h44a5 5 0 015 5v28a5 5 0 01-5 5H6a5 5 0 01-5-5V94z"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default RegisterPage;
