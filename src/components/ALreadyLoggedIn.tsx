import React from "react";
import ButtonPop from "./ButtonPop";
import RectangleShapes from "../assets/RectangleShapes";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../redux/hooks";
import { auth } from "../../firebase-config";
import { apiSlice } from "../redux/features/apiSlice";
import { logout } from "../redux/features/slices/authSlice";

const ALreadyLoggedIn = () => {
    const dispatch = useAppDispatch();
    const handleSignOut = async () => {
        await signOut(auth);
        // remove user from local storage to log user out
        localStorage.removeItem("user");
        dispatch(apiSlice.util.resetApiState());
        dispatch(logout());
    };
    return (
        <div className="relative overflow-hidden text-center text-black  py-10 px-10   rounded blueShadow border border-[#e8effc] dark:border-[#183367]">
            <div>
                <h1 className="dark:text-[#8caef2] text-center text-black text-xl font-extrabold  sm:text-2xl">
                    You are already logged in!
                </h1>
                <p className="text-[#b9bbbe] mt-5 mb-10">
                    would you like to logout?
                </p>
                <ButtonPop
                    type="button"
                    onClick={handleSignOut}
                    className="mt-5 z-10 "
                >
                    {" "}
                    Logout{" "}
                </ButtonPop>
            </div>

            <RectangleShapes />
        </div>
    );
};

export default ALreadyLoggedIn;
