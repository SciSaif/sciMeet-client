import React from "react";
import Input from "../../components/Input";

const LoginPage = () => {
    return (
        <div className="flex justify-center text-center items-center h-screen ">
            <div className="relative overflow-hidden text-black  py-10 px-10 h-[400px] rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
                <h1 className="dark:text-[#8caef2] text-black text-xl font-extrabold  sm:text-2xl">
                    Welcome Back!
                </h1>
                <p className="text-[#b9bbbe] mt-5 mb-10">
                    We are happy that you are with us!
                </p>

                {/* <Input type="email" label="Email" /> */}

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
