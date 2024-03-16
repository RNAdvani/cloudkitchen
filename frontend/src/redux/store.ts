import { configureStore} from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";

export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [userReducer.reducerPath]:userReducer.reducer
    },
    middleware:(mid)=>mid().concat([userAPI.middleware])
})