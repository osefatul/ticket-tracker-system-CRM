import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "../features/ticketSlice/ticketSlice"
import loginReducer from "../features/loginSlice/loginSlice";


const store = configureStore({
    reducer: {
        tickets:ticketReducer,
        auth:loginReducer
    }
})

export default store;