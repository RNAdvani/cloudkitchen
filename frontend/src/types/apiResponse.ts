import { Dish, Kitchen, Order, User } from "./types";

export type MessageResponse = {
    success:boolean;
    message:string
}

export type userResponse = {
    success:boolean;
    user:User
}

export type firebaseErrorResponse = {
    message:string
}

export type openStatusResponse = {
    success:boolean,
    kitchen:Kitchen | null
}

export type currentOrdersResponse = {
    success:true,
    currentOrders:Order[]
}

export type AllMyDishesResponse = {
    success:true,
    dishes: Dish[]
}

export type AllMyDishesRequest = {
    restaurant:string
}

export type AdminDashboardResponse ={
    success:true,
    dashboard:{
        numberOfOrders:number[],
        cuisineCount:{_id:string,count:number}[]
    }
}