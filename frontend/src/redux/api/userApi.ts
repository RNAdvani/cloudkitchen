import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_BACKEND_SERVER
import { MessageResponse, userResponse } from "../../types/apiResponse";
import axios from "axios";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl:`${server}/api/v1/user/`}),
    endpoints:(builder)=>({
        signup : builder.mutation<MessageResponse,FormData>({
            query:(user)=>({
                url:"register",
                method:"post",
                body:user,
            })
        })
    })    
});

export const getUser = async (id:string)=>{
    try {
       const {data}:{data:userResponse} = await axios.get(`${server}/api/v1/user/${id}`);
       return data
    } catch (error) {
        throw error;
    }
}



export const {useSignupMutation} = userAPI

