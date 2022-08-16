import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoading: false,
    error: "",
    selectedUser: {}
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
    getSelectedUserSuccess
} = userSlice.actions;

export default userSlice.reducer;