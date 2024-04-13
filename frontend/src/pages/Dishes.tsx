import DishCard from '../components/DishCard'
import { useAddNewDishMutation, useGetAllMyDishesQuery } from '../redux/api/dishApi'
import { useSelector } from 'react-redux'
import { Dish, userInitialState } from '../types/types'
import { IconButton,Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel, TextField, MenuItem, Select, FormControl, Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useState } from 'react'
import { VisuallyHiddenInput } from '../components/StyledComponents'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { responseToast } from '../util/misc'




const Dishes = () => {
  const [addDishDialogOpen, setAddDishDialogOpen] = useState(false)

    const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer) 

    const {data} = useGetAllMyDishesQuery(user?.owner!)
    
    const handleDialogOpen = ()=>{
        setAddDishDialogOpen((prev)=>!prev)
    }

    const handleClose = ()=>{
        setAddDishDialogOpen((prev)=>!prev)
    }

    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [allergens, setAllergens] = useState("")
    const [typeOfDish, setTypeOfDish] = useState("")
    const [isAvailableInJain, setIsAvailableInJain] = useState("")
    const [photo,setPhoto] = useState<File>();
    const [photoPrev, setPhotoPrev] = useState<string>();


    const [newDish] = useAddNewDishMutation()
    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]!;
        const reader: FileReader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = ()=>{
              if(typeof reader.result === "string"){
                setPhoto((prev)=>file);
                setPhotoPrev((prev)=>reader.result as string)
              }
            }
          }
    }
    
   const formData = new FormData()

   formData.append('name',dishName.trim());
   formData.append('price',price.trim());
   formData.append('description',description.trim());
   formData.append('allergens',allergens.trim());
   formData.append('typeOfDish',typeOfDish);
   formData.append('isAvailableInJain',isAvailableInJain);
   formData.append("photo",photo as Blob);
   formData.append("cuisine",cuisine.trim())

   const handleCancel = ()=>{
        setAddDishDialogOpen(false);
        setDishName("")
        setPrice("")
        setAllergens("")
        setCuisine("")
        setDescription("");
        setPhoto(undefined);
        setPhotoPrev("");
        setIsAvailableInJain("");
        setTypeOfDish("")
   }

   const handleAddDish = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>
   )=>{
        e.preventDefault();
        const res = await newDish({formData,restaurant:user?.owner!});
        handleCancel();
        responseToast(res)
   }

    

  return (
    <>
        <Dialog fullWidth open={addDishDialogOpen} onClose={handleClose}>
            <DialogTitle color={"error"} >
                ADD DISH
            </DialogTitle>
            <DialogContent >
          <DialogContentText padding={"0.4rem"}>
            <Avatar  variant='square' sx={{width:"100%",height:"10rem", marginBottom:"0.4rem",backgroundPosition:"center"}} src={photoPrev} />
                <Stack gap={"0.8rem"} >
                    <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload file
                    <VisuallyHiddenInput required name='photo' onChange={changeHandler} type="file" />
                    </Button>
                    <TextField name='Name' label='Name' value={dishName} onChange={(e)=>setDishName(e.target.value)} />
                    <TextField name='Price' label='Price' type='number' value={price} onChange={(e)=>setPrice(e.target.value)} />
                    <TextField name='Description' label='Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
                    <InputLabel >Type of Dish</InputLabel>
                    <Select
                        value={typeOfDish}
                        onChange={(e)=>setTypeOfDish(e.target.value)}
                    >
                        <MenuItem value={"veg"}>Veg</MenuItem>
                        <MenuItem value={"non-veg"}>Non Veg</MenuItem>
                    </Select>
                    <InputLabel >Available in Jain</InputLabel>
                    <Select
                        value={isAvailableInJain}
                        onChange={(e)=>setIsAvailableInJain(e.target.value)}
                    >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                    </Select>
                    <TextField name='Cuisine' label='Cuisine' value={cuisine} onChange={(e)=>setCuisine(e.target.value)} />
                    <TextField name='Allergens' label='Allergens' value={allergens} onChange={(e)=>setAllergens(e.target.value)} />
                </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type='submit' onClick={handleAddDish} autoFocus>
                Add
              </Button>
            </DialogActions>
        </Dialog>
     <Stack  width={"100%"} alignItems={"center"}>
        <Stack width={"90%"} bgcolor={"#FFD2A5"} className="p-4 bg-[#FFD2A5] rounded-xl" justifyContent={"end"} alignItems={"end"} sx={{
            padding:"0.8rem",
        }} >
            <Button type='submit' startIcon={<AddIcon />} onClick={handleDialogOpen}  variant='contained' color='warning' >
                <Typography  >Add Dish</Typography>
            </Button>
        </Stack>
        <div className='flex mt-4 container justify-center gap-2 px-[2rem] flex-wrap '>
        {
            data?.dishes.map((dish)=><DishCard key={dish.name} dish={dish} />)
        }
        </div>
    </Stack></>
  )
}

export default Dishes