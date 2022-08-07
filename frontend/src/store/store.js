import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "../features/ticketSlice/ticketSlice"
import loginReducer from "../features/authSlice/loginSlice";
import userReducer from "../features/SpecificUerSlice/userSlice"
import newTicketReducer  from '../features/newTicket/newTicketSlice';
import registrationReducer from "../features/authSlice/registrationSlice";


const store = configureStore({
    reducer: {
        tickets:ticketReducer,
        login:loginReducer,
        registration:registrationReducer,
        user: userReducer,
        openTicket: newTicketReducer
    }
})

export default store;