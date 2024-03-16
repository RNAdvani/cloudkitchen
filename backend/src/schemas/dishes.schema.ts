export interface IDishes{
    name:string;
    description:string;
    photo:{
        public_id:string,
        url:string
    };
    price:Number;
    restaurant:Object;
    typeOfDish:"veg"|"non-veg";
    isAvailableInJain:boolean;
    allergens:string;
    createdAt:Date;
    updatedAt:Date;
}