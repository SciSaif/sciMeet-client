import React, {useEffect, useState} from "react";
import {useAppDispatch} from "./hooks";
import {isRejectedWithValue, isFulfilled, addListener, isPending} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";
import GlobalLoader from "../components/GlobalLoader";

const GlobalToastHandler = () => {
	const dispatch = useAppDispatch();
	const {enqueueSnackbar} = useSnackbar();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const HandleAllErrors = dispatch(
			addListener({
				matcher: isRejectedWithValue(),
				effect: (action) => {
					console.log(action);
					if (action?.payload?.status >= 500) {
						enqueueSnackbar("Something went wrong", {variant: "error"});
					} else if (action?.payload?.status >= 400 && action?.payload?.data?.message) {
						enqueueSnackbar(action.payload.data.message, {variant: "error"});
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
					if (action?.payload?.message) {
						enqueueSnackbar(action.payload.message, {variant: "success"});
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

	return <>{loading && <GlobalLoader loading={true} />}</>;
};

export default GlobalToastHandler;
