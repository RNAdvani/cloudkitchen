export type User ={
    _id:string;
    name:string;
    email:string;
    mobile:string;
    photo?:{
        public_id:string,
        url:string
    }
    role?:"admin" | "user" | "chef"
}

export type userInitialState = {
    user: User | null;
    loading: boolean
}