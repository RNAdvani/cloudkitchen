import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetAllMyDishesQuery } from '../redux/api/dishApi';
import { useGetSingleKitchenQuery } from '../redux/api/kitchenApi';
import toast from 'react-hot-toast';
import { responseToast } from '../util/misc';
import { Container, Rating, Stack, Typography } from '@mui/material';
import { Kitchen } from '../types/types';


const KitchenPage = () => {
    const {restaurant} = useParams();

    const {isError:kitchenError,data:KitchenData} = useGetSingleKitchenQuery(restaurant!)

    
    
    if(kitchenError){
        toast.error("Something went wrong");
        <Navigate to="/" />
    }

    const {isError,data} = useGetAllMyDishesQuery(restaurant!);

    if(isError){
        toast.error("Something went wrong");
        <Navigate to="/" />
    }

    const kitchen = KitchenData?.kitchen

  return (
    <Container maxWidth={"xl"}>
        <img src={KitchenData?.kitchen?.photo?.url || ""} alt="" style={{height:"40vh",width:"100%"}}/>
        <h5>{KitchenData?.kitchen.name}</h5>
        <Typography variant='caption'  >
            {KitchenData?.kitchen.about}
        </Typography>
        <Stack direction={"row"} gap={"0.4rem"} className='items-center w-[100%]' >
        <Rating name="half-rating"  defaultValue={kitchen?.ratings} disabled precision={0.5} /> 
        <Typography variant='body2'   >
            {kitchen?.ratings}
        </Typography>
        </Stack>
    </Container>
  )
}

export default KitchenPage