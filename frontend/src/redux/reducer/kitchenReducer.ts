import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Kitchen, kitchenInitialState } from "../../types/types";


const initialState:kitchenInitialState={
    kitchen: null,
    loading:true
}

export const kitchenReducer = createSlice({
    name:"kitchenReducer",
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