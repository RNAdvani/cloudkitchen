import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import toast from "react-hot-toast";
import { openStatusResponse } from "../../types/apiResponse";
export const server = import.meta.env.VITE_BACKEND_SERVER

export const chefApi = createApi({
    reducerPath:"chefApi",
    baseQuery: fetchBaseQuery({baseUrl:`${server}/api/v1/kitchen/`}),
    endpoints:(builder)=>({
        kitchenToggle : builder.mutation({
            query:(id)=>({
                url:"toggle",
                method:"POST",
                body: id
            })
        }),
        isOpen:builder.query<openStatusResponse,string>({query:(id:string)=>`open/${id}`}),
    })
})


export const toggleKitchen = async (id:string)=>{
    try {
        const res = await axios.post(`${server}/api/v1/kitchen/toggle/${id}`);
        if("data" in res){
            toast.success(res.data.message);
        }
    } catch (error) {
        throw new Error;
    }
}

export const isOpenStatusApi = async(id:string)=>{
    try {
        const {data}:{data:openStatusResponse} = await axios.get(`${server}/api/v1/kitchen/open/${id}`)
        return data;
    } catch (error) {
        throw new Error;
    }
}



export const {useIsOpenQuery} = chefApi