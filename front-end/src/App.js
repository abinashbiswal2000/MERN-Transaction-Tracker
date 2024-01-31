import React , { useRef , useEffect } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Components/Routes'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { showLoginStatus } from './Redux/LoggedIn/loggedInActions'
// import { useRef } from 'react'



axios.defaults.withCredentials = true;

export default function App() {


  const useRefValue = useRef(0);
  const dispatch = useDispatch();


  useEffect(() => {
    if(useRefValue.current === 0){
      async function LoggedIn () {
        const axiosResponse = await axios.get('http://localhost:5000/user/LoggedIn');
        // console.log(axiosResponse.data.LoggedIn);
        dispatch(showLoginStatus(axiosResponse.data.LoggedIn))
      }
      LoggedIn();
    }   
    return () => {
      useRefValue.current = 1
    }
  })
  


  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  )
}
