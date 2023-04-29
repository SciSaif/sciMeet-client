import React, { useEffect } from "react";
import GlobalLoader from "../../components/GlobalLoader";
import { useAppDispatch } from "../../redux/hooks";
import { signOut } from "firebase/auth";
import { apiSlice } from "../../redux/features/apiSlice";
import { logout } from "../../redux/features/slices/authSlice";
import { auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignOut = async () => {
        await signOut(auth);
        // remove user from local storage to log user out
        localStorage.removeItem("user");
        dispatch(apiSlice.util.resetApiState());
        dispatch(logout());
        enqueueSnackbar("You have been logged out", {
            variant: "success",
            preventDuplicate: true,
        });
        navigate("/");
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    return <GlobalLoader loading={true} />;
};

export default Logout;
