import { getUserPending, getUserSuccess, getUserFail, getSelectedUserSuccess, getSelectedUserSuccessAfterEdit } from "./userSlice";
import { fetchUser, fetchUserInfoEdit, UpdateUserInfoEdit } from "../../api/userApi";



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







export const UpdateUserInfoOnEdit = (id, userInfo)=> async dispatch =>{

    try {
        dispatch(getUserPending());
        const result = await UpdateUserInfoEdit(id, userInfo)

        // if (result.user && result.user._id){
        if (result){
            dispatch(getSelectedUserSuccessAfterEdit(result.message));
            dispatch(getUserInfoOnEdit(id))
        }

        dispatch(getUserFail("User is not found"));
        
    } catch (error) {
        dispatch(getUserFail(error));
    }
};
