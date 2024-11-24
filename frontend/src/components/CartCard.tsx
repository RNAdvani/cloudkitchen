import {cartInitialState } from '../types/types'
import { Button, ButtonGroup, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {emptyCart, removeFromCart, updateAmounts, updateItemQuantity } from '../redux/reducer/cartReducer'
import { DeleteIcon } from 'lucide-react'


const CartCard = ({dish}:{dish:{
    _id?: Object;
    name: string;
    photo: {
        url: string;
    };
    price: number;
    quantity: number;
    restaurant: Object;
}}) => {

    const {items} = useSelector((state:{cartReducer:cartInitialState})=>state.cartReducer)
    const dispatch = useDispatch();

    let quantity = items.find((i)=>i._id?.toString()===dish._id?.toString())?.quantity;

    const handleIncrement =(_id:Object)=>{
        dispatch(updateItemQuantity({_id,quantity:"inc"}));
        dispatch(updateAmounts());
    }

    const handleDecrement =(_id:Object)=>{
        
        dispatch(updateItemQuantity({_id,quantity:"dec"}));
        dispatch(updateAmounts());
    }
    
    const handleRemoveFromCart = (_id:Object)=>{
        dispatch(removeFromCart({_id}))
    }

  return (
    <Stack direction={"row"} className='items-center justify-between px-[1rem] py-[0.8rem] ' >
        <Stack direction={"row"} className='items-center' >
            <div>
                <img src={dish.photo?.url || ""} className='min-h-[50px] min-w-[50px] h-[5vw] w-[5vw]' alt="" />
            </div>
            <Stack className='p-4' >
                <Typography variant='body1'  fontSize={18} lineHeight={1} fontWeight={400} >
                    {dish.name}
                </Typography>
                <Typography variant='body2'  fontSize={14} lineHeight={1} fontWeight={400} >
                    ₹{dish.price}
                </Typography>
            </Stack>
        </Stack>
        <Stack direction={'row'} >
                <Button color='error' onClick={()=>handleRemoveFromCart(dish._id!)}>
                    <DeleteIcon />
                </Button>
            {   
                <ButtonGroup   >
                <Button color='warning' variant='outlined' disabled={quantity === 1} onClick={()=>handleDecrement(dish._id!)} >
                    -
                </Button>
                <Button variant='outlined' sx={{color:"black"}} color='warning'>
                    {quantity}
                </Button>
                <Button color='warning' variant='outlined'onClick={()=>handleIncrement(dish._id!)} >
                    +
                </Button> 
                </ButtonGroup >
            }
        </Stack>
    </Stack>
  )
}

export default CartCard