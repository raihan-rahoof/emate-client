import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/Authslice'
import LoginReducer from '../features/Auth/LoginSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        authLogin:LoginReducer,
    }
})

export default store