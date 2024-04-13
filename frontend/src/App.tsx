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
import Loader from './components/Loader'
import ProtectedRotes from './components/ProtectedRotes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './pages/admin/Dashboard'
import KitchenPage from './pages/KitchenPage'

const Home = lazy(()=>import("./pages/Home"));
const Login = lazy(()=>import("./pages/Login"));
const SignUp = lazy(()=>import("./pages/Register"));
const Dishes = lazy(()=>import("./pages/Dishes"));

function App() {

  const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer)
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
      <Suspense fallback={<Loader />}  >
        <Routes>
          <Route element={<Outlet />} >
            <Route path='/login' element={<Login isUser={user?false:true} />}  />
            <Route path='/signup' element={<SignUp isUser={user?false:true}/>}  />
          </Route>
          <Route element={<><Header /><Outlet/></>} >
            <Route path='/'  element={<Home />} />
            {/* <Route path='/bar'  element={<BarCharts />} /> */}
          </Route>
          <Route element={<ProtectedRotes isChef={true} />} >
            <Route path='/dishes'  element={<Dishes />} />
            <Route path='/bar'  element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRotes isUser={true} />} >
            <Route path='/kitchen/:restaurant' element={<KitchenPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position={"top-center"} />
    </Router>
   </>
  )
}

export default App