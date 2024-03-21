import { Switch } from "@mui/material"
import { useState } from "react"
import Confirmation from "../components/Confirmation"
import { PiCookingPotBold } from "react-icons/pi";

function ChefPage() {
    const [checked,setChecked] = useState(false);
    const [isOpenModal,setIsOpenModal] = useState(false);

    const handleConfirm = ()=>{
        setChecked((checked)=>!checked);
        setIsOpenModal(false);
    }

    const handleClose = ()=>{
        setIsOpenModal(false);
    }

  return (
    <div className="chef-page flex justify-center items-center flex-col w-[100%]">
        <Confirmation isConfirm={isOpenModal} message={"Turn off"} funcClose={handleClose} funcConfirm={handleConfirm}/>
        <div className="container w-full flex justify-between items-center p-4 bg-[#FFD2A5] rounded-xl">
            <h2 className="px-2 text-[1.1rem] font-[400] text-center">Turn {checked?"Off":"On"} your cloud</h2>
            <Switch color="warning" checked={checked} onClick={()=>setIsOpenModal(true)}/>
        </div>
        <div className="relative w-full ">
        <div className="mx-auto flex flex-col-reverse max-w-7xl lg:grid lg:grid-cols-12 p-6 lg:gap-x-8 lg:px-8">
          <div className="flex  md:flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            </h1>
            <h3 className="p-0 flex items-center m-0 text-[3rem] font-[600] text-gray">Gear Up! <PiCookingPotBold /></h3>
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
    </div>
  )
}

export default ChefPage