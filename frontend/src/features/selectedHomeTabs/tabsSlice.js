import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabSelected: "",
    isLoading: false,
    error: "",
};


const tabsSlice = createSlice({
    name: "Hometabs",
    initialState,
    reducers: {

    getTabsPending: (state) => { 
            state.isLoading = true;
    },
    getTabsSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.tabSelected = payload;
        state.error = "";
    },
    refreshTabSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.tabSelected = "";
        state.error = "";
    },
    getTabsFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },

}
})


export const {
    getTabsPending,
    getTabsSuccess,
    refreshTabSuccess,
    getTabsFail
} = tabsSlice.actions


export default tabsSlice.reducer;