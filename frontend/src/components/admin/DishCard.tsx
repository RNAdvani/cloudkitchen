import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Dish } from '../../types/types';
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDeleteDishMutation } from '../../redux/api/dishApi';
import { responseToast } from '../../util/misc';

export default function DishCard({dish}:{dish:Dish}) {

    const [deleteDish] = useDeleteDishMutation()

    const navigate = useNavigate();

    const deleteHandler = async(id:string)=>{
        console.log(id);
        const res = await deleteDish(id);
        responseToast(res,navigate,"/");
     }
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
