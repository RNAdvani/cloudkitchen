import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./chefApi";
import { MessageResponse, currentOrdersResponse } from "../../types/apiResponse";
import { updateOrderStatus } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/order/`}),
    endpoints:(builder)=>({
        updateStatus:builder.mutation<MessageResponse,updateOrderStatus>({
            query:({id,user})=>({
                url:`update/${id}?user=${user}`,
                method:"POST",
            })
        }),
        getCurrentOrders:builder.query<currentOrdersResponse,updateOrderStatus>({
            query:({id,user})=>`${server}/api/v1/order/current/${id}?user=${user}`
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


export const {useUpdateStatusMutation,useGetCurrentOrdersQuery} = orderApi