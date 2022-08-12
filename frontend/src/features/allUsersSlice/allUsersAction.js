import { getUsersPending, getUsersSuccess, getUsersFail, searchUsers } from "./allUsersSlice";
import { fetchAllUsers } from "../../api/userApi";


export const getUsersData =() => async dispatch => {

    dispatch(getUsersPending());
    try {
        const result = await fetchAllUsers();
        dispatch(getUsersSuccess(result));
        return result
        
    } catch (error) {
        dispatch(getUsersFail(error));
    }
}


export const filterSearchUser = (str) => dispatch => {
    dispatch(searchUsers(str))
}
