import { BrowserRouter as Router,Routes,Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import "./styles/app.scss"
import { Suspense, lazy, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import { getUser } from './redux/api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { userInitialState } from './types/types'
import { Toaster } from 'react-hot-toast'

const Home = lazy(()=>import("./pages/Home"));
const Login = lazy(()=>import("./pages/Login"));
const SignUp = lazy(()=>import("./pages/Register"));

function App() {

  const {user,loading} = useSelector((state:{userReducer:userInitialState})=>state.userReducer)
  const dispatch = useDispatch()



  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      }else{
        dispatch(userNotExist());
      }
    })
  },[])

  return (
   <>
    <Router>
      <Suspense  >
        <Routes>
          <Route element={<Outlet />} >
            <Route path='/login' element={<Login isUser={user?false:true} />}  />
            <Route path='/signup' element={<SignUp isUser={user?false:true}/>}  />
          </Route>
          <Route element={<><Header /><Outlet/></>} >
            <Route path='/'  element={<Home user={user} />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position={"top-center"} />
    </Router>
   </>
  )
}

export default App