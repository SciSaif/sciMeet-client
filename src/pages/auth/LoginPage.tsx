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
import { useAppSelector } from "../../redux/hooks";

import RectangleShapes from "../../assets/RectangleShapes";
import ALreadyLoggedIn from "../../components/ALreadyLoggedIn";

const Form = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
});

type FormType = z.infer<typeof Form>;

const LoginPage = () => {
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const [login, { isLoading: loadingLogin, error }] = useLoginMutation();
    const [loginOnBackend, { isLoading: loadingLoginOnBackend }] =
        useLoginOnbackendMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver: zodResolver(Form) });

    const handleLogin = async (data: FormType) => {
        const token = await login(data).unwrap();
        if (token) {
            const user = await loginOnBackend({ token }).unwrap();
            if (user.newUser) {
                navigate("/newuser");
            } else {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="flex pt-[75px]  justify-center  items-center h-screen ">
            {user?.token ? (
                <ALreadyLoggedIn />
            ) : (
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
                    <RectangleShapes />
                </div>
            )}
        </div>
    );
};

export default LoginPage;
