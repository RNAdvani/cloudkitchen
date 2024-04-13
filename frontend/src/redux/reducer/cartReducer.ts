import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Kitchen, cartInitialState, kitchenInitialState } from "../../types/types";


const initialState:cartInitialState={
   
}

export const cartReducer = createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        kitchenExists:(state,action:PayloadAction<Kitchen>)=>{
            state.kitchen = action.payload;
            state.loading = false;
        },
        kitchenNotExists:(state)=>{
            state.kitchen = null;
            state.loading = false;
        }
    }
});


export const {kitchenExists,kitchenNotExists} = kitchenReducer.actions