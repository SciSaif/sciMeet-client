import Input from "../../components/Input";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonPop from "../../components/ButtonPop";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    useLoginMutation,
    useLoginOnbackendMutation,
} from "../../redux/features/apis/authApi";

const Form = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
});

type FormType = z.infer<typeof Form>;

const LoginPage = () => {
    const navigate = useNavigate();

    const [login, { isLoading: loadingLogin, error }] = useLoginMutation();
    const [loginOnBackend, { isLoading: loadingLoginOnBackend }] =
        useLoginOnbackendMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver: zodResolver(Form) });

    const handleLogin = async (data: FormType) => {
        console.log(data);
        const token = await login(data).unwrap();
        if (token) {
            console.log("token", token);
            await loginOnBackend({ token }).unwrap();
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex pt-[75px]  justify-center  items-center h-screen ">
            <div className="relative overflow-hidden text-black  py-10 px-10   rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
                <h1 className="dark:text-[#8caef2] text-center text-black text-xl font-extrabold  sm:text-2xl">
                    Welcome Back!
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
                    {error && "error" in error && (
                        <div className="text-white text-bold w-full px-2 py-1 rounded-lg bg-red-400">
                            {error.error}
                        </div>
                    )}
                    <ButtonPop type="submit" className="mt-5 z-10 ">
                        {" "}
                        Login{" "}
                    </ButtonPop>

                    {/* create an account link  */}
                    <div className="flex justify-center text-xs items-center mt-5">
                        <p className="text-[#b9bbbe] ">
                            Don't have an account?
                        </p>
                        <Link to="/register">
                            <p className="text-blue-500  ml-1">
                                Create an account
                            </p>
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
        </div>
    );
};

export default LoginPage;
