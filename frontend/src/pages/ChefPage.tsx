import { Switch } from "@mui/material"
import { useEffect, useState } from "react"
import Confirmation from "../components/Confirmation"
import { PiCookingPotBold } from "react-icons/pi";
import { isOpenStatusApi, toggleKitchen, useIsOpenQuery } from "../redux/api/chefApi";
import { useDispatch, useSelector } from "react-redux";
import { Order, kitchenInitialState, userInitialState } from "../types/types";
import CurrentOrders from "../components/CurrentOrders";
import { kitchenExists, kitchenNotExists } from "../redux/reducer/kitchenReducer";
import toast from "react-hot-toast";
import { receivedOrders, useGetCurrentOrdersQuery } from "../redux/api/orderApi";


function ChefPage() {
  const dispatch = useDispatch();

  const order:Order = {
    _id: "65fa905c9045be6713d0ec09",
    items: [
        {
            name: "Paneer Makhani",
            price: 375,
            quantity:1,
        }
    ],
    subTotal: 395,
    deliveryCharges: 15,
    total: 486,
    status: "accepted"
  }

  
  const [isOpenModal,setIsOpenModal] = useState(false);
  const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer) 
  const {kitchen} = useSelector((state:{kitchenReducer:kitchenInitialState})=>state.kitchenReducer)
  const [checked,setChecked] = useState(kitchen?.isOpenNow! as boolean);

  const handleConfirm = ()=>{
    try {
      toggleKitchen(user?.owner!);
      setChecked((prev)=>prev=!kitchen?.isOpenNow);
    } catch (error) {
      throw new Error
    }
  setIsOpenModal(false);
}

const handleClose = ()=>{
  setIsOpenModal(false);
}

const isOpenStatus = async()=>{
  try {
    const data = await isOpenStatusApi(user?.owner!);
    if("kitchen" in data){
      dispatch(kitchenExists(data.kitchen!));
    }else{
      dispatch(kitchenNotExists());
    }
  } catch (error) {
    toast.error("Error Occurred")
  }
}


const {data:currentOrdersData} = useGetCurrentOrdersQuery({id:user?.owner!,user:user?._id!});

useEffect(()=>{
  isOpenStatus() ;
},[checked])
return (
  <div className="flex justify-center items-center h-[100%] flex-col w-[100%]">
      <Confirmation isConfirm={isOpenModal} message={"Turn off"} funcClose={handleClose} funcConfirm={handleConfirm}/>
        <div className="container w-full flex justify-between items-center p-4 bg-[#FFD2A5] rounded-xl">
            <h2 className="px-2 text-[1.1rem] font-[400] text-center">Turn {checked?"Off":"On"} your cloud</h2>
            <Switch color="warning" checked={kitchen?.isOpenNow} onClick={()=>setIsOpenModal(true)}/>
        </div>
        <div className="relative w-full ">
        <div className="mx-auto flex flex-col-reverse max-w-7xl lg:grid lg:grid-cols-12 p-6 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center text-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h3 className="p-0 flex items-center m-0 text-[3rem] font-[600] w-full  flex-col text-gray">Gear Up! <PiCookingPotBold /></h3>
            <h3 className="p-0 m-0 text-[1.5rem] text-gray">To serve people with <br /><span className="italic">Your Savoury</span></h3>
          </div>
          <div className="relative lg:col-span-5 w-full lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[350px] xl:aspect-[16/9]"
              src="ck3.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="upcoming-orders w-full p-4">
          {
            currentOrdersData?.currentOrders.map((i)=><CurrentOrders order={i} />)
          }
      </div>
    </div>
  )
}

export default ChefPage