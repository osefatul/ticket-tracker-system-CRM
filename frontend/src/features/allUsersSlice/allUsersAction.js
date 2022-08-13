import { getUsersPending, getUsersSuccess, getUsersFail, searchUsers, getUsersAndDepartmentsSuccess } from "./allUsersSlice";
import { fetchAllUsers, fetchUsersWithDepartment } from "../../api/userApi";


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


export const fetchUsersDepartment =(str) => async dispatch => {
    dispatch(getUsersPending());
    try {
        const result = await fetchUsersWithDepartment(str);
        dispatch(getUsersAndDepartmentsSuccess(result));
        // console.log(result);
        return result
        
    } catch (error) {
        dispatch(getUsersFail(error));
    }
}



export const filterSearchUser = (str) => dispatch => {
    dispatch(searchUsers(str))
}
