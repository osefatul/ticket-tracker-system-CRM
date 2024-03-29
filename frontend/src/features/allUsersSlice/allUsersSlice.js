import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
    error: "",
    searchUsersList: [],
    usersAndDepartments: []
};

const userSlice = createSlice({
        name: "users",
        initialState,
        reducers: {
    getUsersPending: (state) => { 
        state.isLoading = true;
    },
    getUsersSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
        state.error = "";
        state.searchUsersList = payload;
    },
    getUsersAndDepartmentsSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.usersAndDepartments = payload;
        state.error = "";
        // state.searchUsersList = payload;
    },
    getUsersFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },
    searchUsers: (state, { payload }) => {
        state.searchUsersList = state.users.filter((row) => {
        if (!payload) return row;

        return (row.name.toLowerCase().includes(payload.toLowerCase()) || row.department.toLowerCase().includes(payload.toLowerCase()) || row.email.toLowerCase().includes(payload.toLowerCase()) );
        });
    },
},
});




export const {
    getUsersPending,
    getUsersSuccess,
    getUsersFail,
    searchUsers,
    getUsersAndDepartmentsSuccess

} = userSlice.actions;

export default userSlice.reducer;