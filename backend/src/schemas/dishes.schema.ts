export interface IDishes{
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
    createdAt:Date;
    updatedAt:Date;
}