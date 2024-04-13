import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./chefApi";
import { getKitchenResponse, getKitchensResponse } from "../../types/types";

export const kitchenApi = createApi({
    reducerPath:"kitchenApi",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/kitchen/`}),
    endpoints:(builder)=>({
        getKitchens:builder.query<getKitchensResponse,string>({query:()=>({
            url:`all`,
            method:"GET"
        })}),
        getSingleKitchen:builder.query<getKitchenResponse,string>({query:(restaurant:string)=>({
            url:`restaurant/${restaurant}`,
            method:"GET"
        })})
    })
})


export const {useGetKitchensQuery,useGetSingleKitchenQuery} = kitchenApi