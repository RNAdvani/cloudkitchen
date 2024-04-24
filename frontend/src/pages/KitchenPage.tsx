import { Navigate, useParams } from 'react-router-dom'
import { useGetAllMyDishesQuery } from '../redux/api/dishApi';
import { useGetSingleKitchenQuery } from '../redux/api/kitchenApi';
import toast from 'react-hot-toast';
import { Container, Rating, Stack, Typography } from '@mui/material';
import Loader from '../components/Loader';
import DishCardForCustomers from '../components/Dish';
import { memo } from 'react';


const KitchenPage = () => {
    const {restaurant} = useParams();

    const {isError:kitchenError,data:KitchenData,isLoading,isFetching} = useGetSingleKitchenQuery(restaurant!)

    isLoading || isFetching && (<Loader />)
    
    
    if(kitchenError){
        toast.error("Something went wrong");
        <Navigate to="/" />
    }

    const {isError,data} = useGetAllMyDishesQuery(restaurant!);

    if(isError){
        toast.error("Something went wrong");
        <Navigate to="/" />
    }

    const dishes = data?.dishes;
    const kitchen = KitchenData?.kitchen


  return (
    <Container maxWidth={"xl"}>
        <img src={KitchenData?.kitchen?.photo?.url || ""} alt="" style={{height:"40vh",width:"100%"}}/>
        <h5>{KitchenData?.kitchen.name}</h5>
        <Typography variant='caption'  >
            {KitchenData?.kitchen.about}
        </Typography>
        <Stack direction={"row"} gap={"0.4rem"} className='items-center w-[100%]' >
        <Rating name={kitchen?.name!} readOnly defaultValue={kitchen?.ratings!}  value={kitchen?.ratings!}  precision={0.5} /> 
        <Typography variant='body2'   >
            {kitchen?.ratings}
        </Typography>
        <div className="container"></div>
        </Stack>
        <Stack>
            {
                dishes?.map((i)=>(<DishCardForCustomers dish={i} />))
            }
        </Stack>
    </Container>
  )
}

export default memo(KitchenPage)