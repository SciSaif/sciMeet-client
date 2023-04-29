import ButtonPop from "./ButtonPop";
import RectangleShapes from "../assets/RectangleShapes";

import { Link, useNavigate } from "react-router-dom";

const ALreadyLoggedIn = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/logout");
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
                <ButtonPop onClick={logout} type="button" className=" z-10 ">
                    {" "}
                    Logout{" "}
                </ButtonPop>

                <p className="dark:text-white text-sm mt-3">
                    Go to
                    <Link to="/dashboard" className="text-blue-500">
                        {" "}
                        Dashboard
                    </Link>
                </p>
            </div>

            <RectangleShapes />
        </div>
    );
};

export default ALreadyLoggedIn;
