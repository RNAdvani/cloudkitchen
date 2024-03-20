export interface IUser extends Document{
    _id:string;
    name:string;
    email:string;
    mobile:string;
    role: "admin" | "chef" | "user";
    createdAt:Date;
    updatedAt:Date;
    photo:{
        public_id:string,
        url:string
    }
    owner:Object
}