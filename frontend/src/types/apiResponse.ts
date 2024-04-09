import { Kitchen, Order, User } from "./types";

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