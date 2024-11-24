import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Kitchen } from '../types/types';

export default function RestaurantCard({kitchen}:{kitchen:Kitchen}) {
    
  return (
    <Link to={`/kitchen/${kitchen._id}`} >
        <Card sx={{borderRadius:"20px",width:345 }} >
      <CardActionArea >
        <CardMedia className='h-[150px]'
          component="img"
          height="140"
          image={kitchen.photo?.url}
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {kitchen.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
                kitchen.about || "A new Cloud Kitchen"
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}
