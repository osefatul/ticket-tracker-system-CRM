import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isAuth: false,
    error: ""
}

const loginSlice = createSlice ({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state, action)=>{
            state.isLoading = true
        },
        loginSuccess: (state)=>{
            state.isLoading = false
            state.isAuth = true
            state.error = ""
        },
        loginFail: (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        },
        EraseLoginError: (state, action)=>{
            state.isLoading = false
            state.error = ""
        }
    }
})

const { reducer, actions} = loginSlice


export const  {loginPending, loginSuccess, loginFail, EraseLoginError} = actions
export default reducer;

