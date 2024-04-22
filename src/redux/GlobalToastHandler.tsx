import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
    isRejectedWithValue,
    isFulfilled,
    addListener,
    isPending,
} from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import GlobalLoader from "../components/GlobalLoader";
import { setToastMessage } from "./features/slices/otherSlice";

const GlobalToastHandler = () => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const toastMessage = useAppSelector((state) => state.other.toastMessage);

    useEffect(() => {
        const HandleAllErrors = dispatch(
            addListener({
                matcher: isRejectedWithValue(),
                effect: (action) => {
                    console.log(action);
                    if (action?.payload?.status >= 500) {
                        enqueueSnackbar("Something went wrong", {
                            variant: "error",
                        });
                    } else if (
                        action?.payload?.status >= 400 &&
                        action?.payload?.data?.toast
                    ) {
                        enqueueSnackbar(action.payload.data.toast, {
                            variant: "error",
                        });
                    }
                    setLoading(false);
                },
            })
        );

        return HandleAllErrors;
    }, []);

    useEffect(() => {
        const HandleAllSuccesses = dispatch(
            addListener({
                matcher: isFulfilled(),
                effect: (action) => {
                    if (action?.payload?.toast) {
                        enqueueSnackbar(action.payload.toast, {
                            variant: "success",
                        });
                    }
                    setLoading(false);
                },
            })
        );

        return HandleAllSuccesses;
    }, []);

    useEffect(() => {
        const handleAllLoading = dispatch(
            addListener({
                matcher: isPending(),
                effect: (action) => {
                    setLoading(true);
                },
            })
        );

        return handleAllLoading;
    }, []);

    useEffect(() => {
        if (toastMessage) {
            enqueueSnackbar(toastMessage, {
                variant: "error",
            });
            dispatch(setToastMessage(""));
        }
    }, [toastMessage]);

    return <>{loading && <GlobalLoader loading={true} />}</>;
};

export default GlobalToastHandler;
