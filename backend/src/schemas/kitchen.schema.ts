export interface IKitchen {
    name:string;
    owner:Object;
    photo:{
        public_id:string,
        url:string
    };
    about:String;
    isOpenNow:boolean;
    requestStatus?: "reviewing" | "accepted" |"rejected";
    closedPermanent : boolean
}