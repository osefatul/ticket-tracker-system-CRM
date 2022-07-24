import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "../features/ticketSlice/ticketSlice"
import loginReducer from "../features/authSlice/loginSlice";
import registrationReducer from "../features/authSlice/registrationSlice";



const store = configureStore({
    reducer: {
        tickets:ticketReducer,
        login:loginReducer,
        registration:registrationReducer
    }
})

export default store;