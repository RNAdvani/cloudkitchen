import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {cartInitialState} from "../../types/types";


const initialState:cartInitialState={
   items:[],
   address:"",
   deliveryCharges:0,
   discount:0,
   subTotal:0,
   total:0
}

export const cartReducer = createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<{
            _id ?:Object;
            name: string;
            photo: {
              url: string;
            };
            price: number;
            quantity: number;
          }>)=>{
            state.items.push(action.payload);
            state.subTotal += action.payload.price;
            state.deliveryCharges = state.subTotal > 500 ? 0 : Math.min(0.1*state.subTotal,100);
            state.total = state.subTotal + state.deliveryCharges - state.discount;
        },
        updateItemQuantity:(state,action:PayloadAction<{_id:Object,quantity:"inc"|"dec"}>)=>{
            state.items.map((i)=>{
               if (i._id?.toString() === action.payload._id.toString() ){
                    i.quantity += action.payload.quantity === "inc" ? 1 : -1;
               }
               return i;
            })
        },
        removeFromCart:(state,action:PayloadAction<{_id:Object}>)=>{
            state.items.filter((i)=>i._id?.toString() !== action.payload._id.toString())
        }
        ,
        updateAmounts:(state)=>{
            state.subTotal = state.items.reduce((acc,cur)=>(acc+(cur.price*cur.quantity)),0);
            state.deliveryCharges = state.subTotal > 500 ? 0 : Math.min(0.1*state.subTotal,100);
            state.total = state.subTotal + state.deliveryCharges - state.discount;
        },
        emptyCart:(state)=>{
            state.address = "";
            state.deliveryCharges = 0;
            state.total = 0;
            state.subTotal = 0;
            state.discount = 0 ;
        }
    }
});

export const {addToCart,emptyCart,removeFromCart,updateAmounts,updateItemQuantity} = cartReducer.actions