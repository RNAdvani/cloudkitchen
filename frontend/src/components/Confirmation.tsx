type ConfirmationType ={
    isConfirm:boolean;
    funcConfirm:()=>void;
    funcClose:()=>void;
    message:string;
}

function Confirmation({isConfirm,message,funcConfirm, funcClose}:ConfirmationType) {

 return (isConfirm && (
    <div className={`confirmation-modal h-full bg-[rgba(0,0,0,0.4)] absolute w-[100vw] justify-center top-0 z-40 grid items-center`}>
       <div className="bg-[#f4f1eb] h-[9.5rem] px-4 py-2 aspect-video flex flex-col justify-between items-center rounded-lg">
            <h3 className="text-[1.1rem] font-[500] pt-4">Are You Sure You want to {message}?</h3>
           <div className="w-[100%] items-end flex gap-2 justify-end">
                <button className=" p-1 px-2 text-[#f4f1eb] bg-[#e86247]  text-center rounded-md" onClick={()=>funcClose()}>Cancel</button>
                <button className="bg-[#5ca84f] text-center p-1 px-2 rounded-md text-[#f4f1eb]" onClick={()=>funcConfirm()}>Confirm</button>
           </div>
       </div>
    </div>
  ))
}

export default Confirmation