import toast from "react-hot-toast";
import { Order, updateOrderStatus, userInitialState } from "../types/types"
import { updateOrder, useUpdateStatusMutation} from '../redux/api/orderApi'
import { useSelector } from "react-redux";
import { memo } from "react";
import { responseToast } from "../util/misc";

function CurrentOrders({order}:{order:Order}) {

  const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer);

  const [updateOrderStatus] = useUpdateStatusMutation()

  const handleUpdate = async ({id,user}:updateOrderStatus)=>{
    // try {
    //   const data = await updateOrder({id,user});
    //   toast.success(data?.message!);
    // } catch (error) {
    //   console.log(error)
    //   toast.error("Something went wrong")
    // }
    const res = await updateOrderStatus({id,user});
    responseToast(res)
  }


  return (
    <div className={`${order.status === "accepted" ?"border-yellow-500" :order.status === "preparing" ?"border-green-600":"border-green-400 opacity-40"}  rounded-xl  border-2 order w-full px-8 py-2`}>
      <h3><span className="font-semibold">Order ID: </span>{order._id}</h3>
      <div className="flex flex-col">
        {order.items.map((item)=>
        <h2 key={item.name} className="font-bold">{item.name}   X {item.quantity} </h2>)}
        <h1>Total: ₹{order.total}</h1>
      </div>
      <div className={`flex justify-between items-center py-2`}>
        <p className={ `${order.status == "accepted"?"text-yellow-500":"text-green-600"} uppercase`} onClick={()=>{if(order.status==='preparing') order.status='delivering'}}>{order.status}</p>
        <button className="p-2 bg-[#FFD2A5] rounded-md" disabled={order.status=="delivering"?true:false} onClick={()=>handleUpdate({id:order._id,user:user?._id!})}>Update Status</button>
      </div>
    </div>
  )
}

export default memo(CurrentOrders)