import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoading: false,
    error: "",
    selectedUser: {},
    selectedUserAfterEdit: {},
    deletedUser:{}
};

const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
    getUserPending: (state) => { 
        state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = "";
    },
    getSelectedUserSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.selectedUser = payload;
        state.error = "";
    },
    getDeletedUserSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.deletedUser = payload;
        state.error = "";
    },
    getSelectedUserRefresh: (state) => {
        state.isLoading = false;
        state.selectedUser = "";
        state.error = "";
    },

    getSelectedUserSuccessAfterEdit: (state, { payload }) => { 
        state.isLoading = false;
        state.selectedUserAfterEdit = payload;
        state.error = "";
    },
    getUserFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },
},
});

export const {
    getUserPending,
    getUserSuccess,
    getUserFail,
    getSelectedUserSuccess,
    getSelectedUserSuccessAfterEdit,
    getSelectedUserRefresh,
    getDeletedUserSuccess
} = userSlice.actions;

export default userSlice.reducer;