import {
	otpReqPending,
	otpReqSuccess,
	otpReqFail,
	updatePassSuccess,
} from "./passwordResetSlice";

import { requestPasswordOTP, updateUserPassword } from "../../api/resetPasswordApi";




export const sendPasswordResetOtp = (email) => async dispatch => {
	try {

		dispatch(otpReqPending());
		const data = await requestPasswordOTP(email);
        
        console.log(data);

        dispatch(otpReqSuccess(data));

		// if (status === "success") {
		// 	return dispatch(otpReqSuccess({ message, email }));
		// }

		// dispatch(otpReqFail(message));

	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};




export const updatePassword = frmData => async dispatch => {
	try {
		dispatch(otpReqPending());

		const { status, message } = await updateUserPassword(frmData);

		if (status === "success") {
			return dispatch(updatePassSuccess(message));
		}

		dispatch(otpReqFail(message));
	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};