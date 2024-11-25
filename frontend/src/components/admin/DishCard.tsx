import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import { Dish } from '../../types/types';



export default function DishCard({dish}:{dish:Dish}) {

    
  return (
    <Card >
      <CardActionArea  sx={{ width: "230px",height:"300px",}}>
         <img className='h-[100px] aspect-video' src={dish.photo?.url} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {dish.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            ₹{dish.price}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {dish.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent:"end"}} >
      </CardActions>
    </Card>
  );
}
