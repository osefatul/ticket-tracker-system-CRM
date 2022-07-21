import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from "../ticketSlice/ticketSlice"

const store = configureStore({
    reducer: {
        tickets:ticketReducer
    }
})

export default store;