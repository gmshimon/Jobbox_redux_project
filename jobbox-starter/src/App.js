import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { fetchUser, setUser, toggleLoading } from "./redux/features/Auth/authSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        dispatch(fetchUser(user?.email))
        dispatch(setUser(user?.email))
      }else{
        dispatch(toggleLoading())
      }
    })
  },[])
  return (
    <>
    <Toaster position="top-right"
  reverseOrder={false}/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
