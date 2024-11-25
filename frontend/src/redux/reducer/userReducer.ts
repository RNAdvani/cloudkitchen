import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, userInitialState } from "../../types/types";

export const initialState:userInitialState={
    user:null,
    loading:true
}

export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state,action:PayloadAction<User>)=>{
            state.user = action.payload
            state.loading = false
        },
        userNotExist:(state)=>{
            state.user = null,
            state.loading = false
        }
    },
})


export const {userExist,userNotExist} = userReducer.actions