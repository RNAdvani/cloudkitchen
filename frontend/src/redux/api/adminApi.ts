import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./chefApi";
import { AdminDashboardResponse } from "../../types/apiResponse";

export const adminApi = createApi({
    reducerPath:"adminApi",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/admin/`}),
    endpoints:(builder)=>({
        getDashboardStats: builder.query<AdminDashboardResponse,string>({query:(id:string)=>({
            url:`dashboard/${id}`,
            method:"GET"
        })})
    })
})

export const {useGetDashboardStatsQuery} = adminApi