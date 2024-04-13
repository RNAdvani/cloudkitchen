
import { userInitialState } from '../types/types'
import ChefPage from './ChefPage'
import { useSelector } from 'react-redux'

import Loader from '../components/Loader'
import { Container, Typography } from '@mui/material'
import RestaurantCard from '../components/RestaurantCard'
import { useGetKitchensQuery } from '../redux/api/kitchenApi'
import { FileX } from 'lucide-react'




function Home() {
  const {user,loading} = useSelector((state:{userReducer:userInitialState})=>state.userReducer)
  const {data} = useGetKitchensQuery("");
  console.log(data)

  if(loading) return <Loader />

  if(user?.role == "chef") return <ChefPage />

  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full ">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            {
              user ? (user.role === "admin"?"Take our cloud to soaring heights" : "Unveiling Culinary Geniuses") : "Join to discover food from Professional chefs"
            }
            </h1>
            <p className="mt-8 text-xl text-gray-700">
            Introducing the Culinary Wizards Crafting Irresistibly Tasty Delights!
            </p>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[620px] xl:aspect-[16/9]"
              src="ck2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <Typography variant='h4' textAlign={"center"} margin={"1rem"} >Discover Soaring Clouds</Typography>
      <Container maxWidth={"xl"}sx={{
        display:"flex",
        margin:"2rem 0",
        padding:"0 1rem",
        gap: "1rem"
      }} >
            {
              data?.kitchens.map((i)=>(<RestaurantCard kitchen={i} key={i.owner} />))
            }
      </Container>
    </div>
  )
}

export default Home 