import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "../features/ticketSlice/ticketSlice"
import loginReducer from "../features/authSlice/loginSlice";
import userReducer from "../features/SpecificUerSlice/userSlice"
import usersReducer from "../features/allUsersSlice/allUsersSlice"
import newTicketReducer  from '../features/newTicket/newTicketSlice';
import registrationReducer from "../features/authSlice/registrationSlice";
import resetPasswordReducer from "../features/passwordResetSlice/passwordResetSlice";
import tabsReducer from '../features/selectedHomeTabs/tabsSlice';



const store = configureStore({
    reducer: {
        tickets:ticketReducer,
        login:loginReducer,
        registration:registrationReducer,
        user: userReducer,
        openTicket: newTicketReducer,
        resetPassword: resetPasswordReducer,
        allUsers: usersReducer,
        homeTabs: tabsReducer,
    }
})

export default store;