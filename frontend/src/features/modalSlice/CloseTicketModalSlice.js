import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpen: false,
    isLoading: false,
    error: "",
};

const CloseTicketModalSlice = createSlice({
    
    name: "closeTicket",
    initialState,

    reducers: {
        setModalOpenPending: (state) => { 
            state.isLoading = true;
    },
        setModalOpenSuccess: (state) => {
        state.modalOpen = true;
        state.isLoading = false;
    },
        setModalCloseSuccess: (state) => {
        state.modalOpen = false;
        state.isLoading = false;
    },
        setModalOpenFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },
},

});

export const {
    setModalOpenSuccess,
    setModalCloseSuccess,
    setModalOpenFail,
    setModalOpenPending
    
} = CloseTicketModalSlice.actions;
export default CloseTicketModalSlice.reducer;