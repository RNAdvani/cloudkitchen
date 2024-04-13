import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router-dom"
import toast from "react-hot-toast"
import { MessageResponse } from "../types/apiResponse"

export type resType = 
    {
      data: MessageResponse
     } |{
        error:FetchBaseQueryError | SerializedError
    }

export const responseToast = (res:resType,navigate?:NavigateFunction | null,url?:string | null)=>{
    if("data" in res){
        toast.success(res.data.message);
        if(navigate && url) navigate(url!)
    }else{
        const error = res.error as FetchBaseQueryError
        const Errormessage = error.data as MessageResponse
        toast.error(Errormessage.message);
    }
}