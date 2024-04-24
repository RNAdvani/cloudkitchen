import { Dish, cartInitialState } from '../types/types'
import { Button, ButtonGroup, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateItemQuantity } from '../redux/reducer/cartReducer'
import toast from 'react-hot-toast'


const DishCardForCustomers = ({dish}:{dish:Dish}) => {

    const {items} = useSelector((state:{cartReducer:cartInitialState})=>state.cartReducer)
    const dispatch = useDispatch();

    let quantity = items.find((i)=>i._id?.toString()===dish._id.toString())?.quantity;

    const handleAddToCart = (dish:Dish)=>{
        if(items.length > 0 && items[0].restaurant.toString() !== dish.restaurant.toString()){
           toast.error("Please complete your order from different restaurant first");
           return;
        };
        dispatch(addToCart({...dish,quantity:1}))
    }

    const handleIncrement =(_id:Object)=>{
        dispatch(updateItemQuantity({_id,quantity:"inc"}));
    }

    const handleDecrement =(_id:Object)=>{
        dispatch(updateItemQuantity({_id,quantity:"dec"}));
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
                <Typography variant='body2' fontSize={12} lineHeight={1.5} color={"GrayText"}  fontStyle={"italic"} >
                    {dish.description}
                </Typography>
                <Typography variant='body2' fontWeight={"600"} fontSize={12} color={"GrayText"}  >
                    Allergens: {dish.allergens}
                </Typography>
            </Stack>
        </Stack>
        <Stack >
            {
                items.find((i)=>i._id?.toString()===dish._id.toString()) ? 
                
                <ButtonGroup   >
                <Button color='warning' variant='outlined' disabled={quantity === 1} onClick={()=>handleDecrement(dish._id)} >
                    -
                </Button>
                <Button variant='outlined' sx={{color:"black"}} color='warning'>
                    {quantity}
                </Button>
                <Button color='warning' variant='outlined'onClick={()=>handleIncrement(dish._id)} >
                    +
                </Button> 
                </ButtonGroup >
                
                :
            <Button color='warning' onClick={()=>handleAddToCart(dish)} >
                Add to cart
            </Button>
            }
        </Stack>
    </Stack>
  )
}

export default DishCardForCustomers