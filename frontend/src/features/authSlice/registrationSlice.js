import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: "",
    message: "",
}

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        registrationPending: (state) => {
            state.isLoading = true;
        },
        registrationSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.status = "success";
            state.message = payload;
        },
        registrationError: (state, { payload }) => {
            state.isLoading = false;
            state.status = "error";
            state.message = payload;
        },
        EraseRegistrationError: (state, ) => {
            state.isLoading = false;
            state.status = "";
            state.message = " ";
        },
    }
})

const { reducer, actions } = registrationSlice;

export const {
registrationPending,
registrationSuccess,
registrationError,
EraseRegistrationError
} = actions;

export default reducer;