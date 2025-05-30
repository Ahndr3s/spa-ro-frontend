import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'name',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined
    },
    reducers:{
        onChecking: (state) => {
            state.status = 'checking',
            state.user = {},
            state.errorMessage = undefined
        },
        onLogin: (state, {payload}) => {
            state.status = 'Authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, {payload}) => {
            state.status = 'no-authenticated'
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        } 
    }
})

export const {onChecking, onLogin, onLogout, clearErrorMessage} = authSlice.actions