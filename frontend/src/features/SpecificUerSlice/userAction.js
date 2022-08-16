import { getUserPending, getUserSuccess, getUserFail, getSelectedUserSuccess } from "./userSlice";
import { fetchUser, fetchUserInfoEdit } from "../../api/userApi";



export const getUserProfile = ()=> async dispatch =>{

    try {
        dispatch(getUserPending());
        const result = await fetchUser()

        if (result.user && result.user._id){
            return dispatch(getUserSuccess(result.user));
        }

        dispatch(getUserFail("User is not found"));
        
    } catch (error) {
        dispatch(getUserFail(error));
    }
};





export const getUserInfoOnEdit = (id)=> async dispatch =>{

    try {
        dispatch(getUserPending());
        const result = await fetchUserInfoEdit(id)

        // if (result.user && result.user._id){
        if (result.user){
            return dispatch(getSelectedUserSuccess(result.user));
        }

        dispatch(getUserFail("User is not found"));
        
    } catch (error) {
        dispatch(getUserFail(error));
    }
};