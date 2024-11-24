import { useDispatch, useSelector } from "react-redux"
import { cartInitialState, userInitialState } from "../types/types"
import CartCard from "../components/CartCard"
import { Button, Typography } from "@mui/material"
import { usePlaceOrderMutation } from "../redux/api/orderApi"
import { responseToast } from "../util/misc"
import { emptyCart, updateAmounts } from "../redux/reducer/cartReducer"

const Cart = () => {
    const {items,deliveryCharges,discount,total,subTotal} = useSelector((state:{cartReducer:cartInitialState})=>state.cartReducer);
    const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer) 
    const [newOrder] = usePlaceOrderMutation();
    const dispatch = useDispatch();
    
    const handleOrder = async()=>{
        const modItems :{
            name: string;
            price: number;
            quantity: number;
          }[] = items.map(({name,price,quantity})=>({
            name,
            price,
            quantity
          }))
        const res = await newOrder({deliveryCharges,discount,total,subTotal,items:modItems,user:user?._id!,restaurant:items[0].restaurant.toString()});

        responseToast(res);
        
        dispatch(emptyCart());
    }

  return (
    <div className="lg:h-[90vh] h-[90vh] w-[100vw] flex flex-col lg:flex-row px-2">
        <div className="w-full h-[75%] lg:h-full border-2 overflow-y-scroll">
            {
                items.map((i,idx)=><CartCard dish={i} key={idx} />)
            }
        </div>
        <div className="side w-[100%] h-[25%] lg:h-full lg:w-[30vw] border-2">
            <div className="flex flex-col h-[90%] lg:justify-center lg:items-center">
                <Typography>
                    Subtotal : {subTotal}
                </Typography>
                <Typography>
                    Delivary Charges : {deliveryCharges}
                </Typography>
                <Typography>
                    Discount : {discount}
                </Typography>
                <Typography>
                    Total : {total}
                </Typography>
            </div>
            <div className="flex justify-end p-4" >
               <Button color={'error'} onClick={handleOrder}>
                    Place Order
               </Button>
            </div>
        </div>
    </div>
  )
  
}

export default Cart