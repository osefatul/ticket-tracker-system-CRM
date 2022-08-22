import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tickets: [],
    adminTickets: [],
    isLoading: false,
    error: "",
    replyMsg: "",
    replyTicketError: "",
    searchTicketList: [],
    selectedTicket: {},
};


const ticketListSlice = createSlice({
    name: "ticketList",
    initialState,

    reducers: {
    fetchTicketLoading: (state) => {
        state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
        state.tickets = action.payload;
        state.searchTicketList = action.payload;
        state.isLoading = false;
    },

    fetchAdminTicketSuccess: (state, action) => {
        state.adminTickets = action.payload;
        state.searchTicketList = action.payload;
        state.isLoading = false;
    },

    fetchTicketFail: (state, { payload }) => {//payload has been destructured from action
        state.isLoading = false;
        state.error = payload;
    },
    searchTickets: (state, { payload }) => {
        state.searchTicketList = state.tickets.filter((row) => {
        if (!payload) return row;

        return (row.title.toLowerCase().includes(payload.toLowerCase()) || row.department.toLowerCase().includes(payload.toLowerCase()) )
        });
    },
    searchAdminTickets: (state, { payload }) => {
        state.searchTicketList = state.adminTickets.filter((row) => {
        if (!payload) return row;

        return (row.title.toLowerCase().includes(payload.toLowerCase()) 
        || row.department.toLowerCase().includes(payload.toLowerCase())
        || row.status.toLowerCase().includes(payload.toLowerCase())
        );
        });
    },
    fetchSingleTicketLoading: (state) => {
        state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, { payload }) => {
        state.selectedTicket = payload;
        state.isLoading = false;
        state.error = "";
    },
    fetchSingleTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },
    replyTicketLoading: (state) => {
        state.isLoading = true;
    },
    replyTicketSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.error = "";
        state.replyMsg = payload;
    },
    replyTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.replyTicketError = payload;
    },
    closeTicketLoading: (state) => {
        state.isLoading = true;
    },
    closeTicketSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.error = "";
        state.replyMsg = payload;
    },
    closeTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
    },
    resetResponseMsg: (state) => {
        state.isLoading = false;
        state.replyTicketError = "";
        state.replyMsg = "";
    },
    resetTicketsList: (state) => {
        state.isLoading = false;
        state.replyTicketError = "";
        state.replyMsg = "";
        state.tickets= [];
        state.searchTicketList = []
    },
    },
});


const { reducer, actions } = ticketListSlice;


export const {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    fetchAdminTicketSuccess,
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketFail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketFail,
    searchTickets,
    searchAdminTickets,
    resetResponseMsg,
    resetTicketsList
} = actions;



export default reducer;