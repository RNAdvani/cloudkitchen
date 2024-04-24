import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom";

interface Props{
    children?:ReactElement;
    isAuthenticated:boolean;
    adminRoute?:boolean;
    isAdmin?:boolean;
    redirect?:string
}


function ProtectedRoutes({isAuthenticated,isAdmin,adminRoute,children,redirect="/"}:Props) {
    if(!isAuthenticated) return <Navigate to={redirect} />
    // if(!isAdmin && adminRoute) return <Navigate to={redirect} />
    // if(!adminRoute && !isAdmin) return <Navigate to={redirect} />
    return children?children:<Outlet />
}

export default ProtectedRoutes