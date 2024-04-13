import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./chefApi";
import {AllMyDishesResponse, MessageResponse } from "../../types/apiResponse";
import { AddNewDishQuery, Dish } from "../../types/types";


export const dishApi = createApi({
    reducerPath:"dishApi",
    baseQuery: fetchBaseQuery({baseUrl:`${server}/api/v1/dish/`}),
    tagTypes:['Dishes'],
    endpoints:(builder)=>({
        getAllMyDishes:builder.query<AllMyDishesResponse,string>({query:(restaurant:string)=>({
            url:`all/${restaurant}`,
            method:"GET",
        }),
        providesTags:["Dishes"]
    }),
        addNewDish:builder.mutation({query:({formData,restaurant})=>({
            url:`/add/${restaurant}`,
            method:"POST",
            body:formData,
        }),
        invalidatesTags:['Dishes']
    }),
        deleteDish: builder.mutation<MessageResponse,string>({query:(id)=>({
            url:`delete/${id}`,
            method:"DELETE",
        }),
        invalidatesTags:['Dishes']
    })
    })
})

export const {useGetAllMyDishesQuery,useAddNewDishMutation,useDeleteDishMutation} = dishApi