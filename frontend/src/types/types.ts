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
    _id:string
    name:string;
    owner:string;
    photo:{
        public_id:string,
        url:string
    };
    about:String;
    isOpenNow:boolean;
    closedPermanent : boolean;
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

export type Dish ={
    _id:Object
    name:string;
    description:string;
    photo:{
        public_id:string,
        url:string
    };
    price:number;
    restaurant:Object;
    cuisine:string
    typeOfDish:"veg"|"non-veg";
    isAvailableInJain:boolean;
    allergens:string;
}

export type AddNewDishQuery = {
    formData:FormData,
    restaurant: string
}

export type getKitchensResponse = {
    success:boolean,
    kitchens:Kitchen[]
}

export type getKitchenResponse = {
    success:boolean,
    kitchen:Kitchen
}

export type cartInitialState = {
    restaurnt?: Kitchen
  
    address: string; // Optional address
  
    items: {
        _id?:Object;
      name: string;
      photo: {
        url: string;
      };
      price: number;
      quantity: number;
      restaurant:Object;
    }[] ;
  
    subTotal: number;
    discount: number ;
    deliveryCharges: number ;
    total: number ;
  } 