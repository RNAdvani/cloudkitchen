export type User ={
    _id:string;
    name:string;
    email:string;
    mobile:string;
    photo?:{
        public_id:string,
        url:string
    }
    owner?:string
    role?:"admin" | "user" | "chef"
}

export type userInitialState = {
    user: User | null;
    loading: boolean
}

export type Order = {
    _id:string,
    items:{name:string,price:number,quantity:number}[],
    status : "accepted"|"preparing"|"delivering",
    subTotal:number,
    deliveryCharges:number
    total:number,
}

export type Kitchen ={
    name:string;
    isOpenNow:boolean;
    reviews:[
        {
            user:string,
            rating:number,
            review:string,
        }
    ];
    ratings:number
}

export type kitchenInitialState ={
    kitchen: Kitchen | null,
    loading:boolean
}

export type updateOrderStatus =  {
    user:string,
    id:string,
}
