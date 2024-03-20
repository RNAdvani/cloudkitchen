export interface IKitchen {
    name:string;
    owner:string;
    photo:{
        public_id:string,
        url:string
    };
    about:String;
    isOpenNow:boolean;
    closedPermanent : boolean
}