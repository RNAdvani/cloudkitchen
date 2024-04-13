import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userInitialState } from '../types/types'

const ProtectedRotes = ({isChef=false,isAdmin=false,isUser=false}:{isChef?:boolean,isAdmin?:boolean,isUser?:boolean}) => {
    const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer)


    if(isChef && user?.role !== "chef") return <Navigate to={"/"} />
    if(isAdmin && user?.role !== "admin") return <Navigate to={"/"} />
    if(isUser && user?.role !== "user") return <Navigate to={"/"} />
    return <><Header /><Outlet/></>
}

export default ProtectedRotes