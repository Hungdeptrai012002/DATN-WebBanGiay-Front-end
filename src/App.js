import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slices/userSlice'
import axios from 'axios';

export function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect(()=>{
    setIsLoading(true)
      const {storageData, decoded} = handleDecoded()
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id, storageData)
      }
      setIsLoading(false)
  },[])
  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
    } 
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const { decoded } = handleDecoded()
    const currentTime = new Date()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshtoken = jwtDecode(refreshToken)
    if(decoded?.exp < currentTime.getTime()/1000){
      if(decodedRefreshtoken?.exp > currentTime.getTime() /1000){
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
    
  }
  return (
    <div>
      
      <Router>
        <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const ischeckAuth = !route.isPrivate || user.isAdmin
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          const routePath = ischeckAuth ? route.path : null; // Sử dụng biểu thức ba ngôi để kiểm tra điều kiện

          return (
            <Route
              key={route.path}
              path={routePath}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
          
          
        </Routes>
      </Router>
    </div>
  )
}

export default App