import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./chefApi";
import { MessageResponse, currentOrdersResponse } from "../../types/apiResponse";
import { orderType, updateOrderStatus } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/order/`}),
    tagTypes:["Current-Orders"],
    endpoints:(builder)=>({
        getCurrentOrders:builder.query<currentOrdersResponse,updateOrderStatus>({
            query:({id})=>({
                url:`${server}/api/v1/order/current/${id}`,
                method:"GET",
            }),
            providesTags:["Current-Orders"]
        }),
        updateStatus:builder.mutation<MessageResponse,updateOrderStatus>({
            query:({id})=>({
                url:`update/${id}`,
                method:"POST",
            }),
            invalidatesTags:["Current-Orders"]
        }),
        placeOrder:builder.mutation<MessageResponse,orderType>({
            query:({items,deliveryCharges,discount,total,subTotal,restaurant,user})=>({
                url:`new?user=${user}&restaurant=${restaurant}`,
                method:"POST",
                body:{items,deliveryCharges,discount,total,subTotal}
            })
        })
       
    })
});

export const updateOrder = async({id,user}:updateOrderStatus)=>{
    try {
        const {data}:{data:MessageResponse} = await axios.post(`${server}/api/v1/order/update/${id}?user=${user}`)
        return data
    } catch (error) {
        toast.error("Something went wrong")
    }
}

export const receivedOrders  = async({id,user}:updateOrderStatus)=>{
    try {
        const {data}:{data:currentOrdersResponse} = await axios.get(`${server}/api/v1/order/current/${id}?user=${user}`);
        return data.currentOrders;
    } catch (error) {
        toast.error("Something went wrong")
    }
}


export const {useUpdateStatusMutation,useGetCurrentOrdersQuery,usePlaceOrderMutation} = orderApi