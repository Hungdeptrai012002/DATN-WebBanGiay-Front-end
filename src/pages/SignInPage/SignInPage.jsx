import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd';
import {useLocation, useNavigate} from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import imagelogo from '../../assets/images/logo-login.png'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice';
import { storage } from 'redux-persist/lib/storage';
import { refreshToken } from './../../services/UserService';

const SignInPage = () => {
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation()
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isSuccess } = mutation

  useEffect(()=>{
    if(isSuccess){
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/')

      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token);
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token, refreshToken}))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleSignIn = () =>{
    mutation.mutate({
      email,
      password
    })
    // console.log("sign-in", email, password)
  }
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0, 0, 0, 0.53)', height:'100vh'}}>
      <div style={{ width:'800px', height:'445px', borderRadius:'6px', backgroundColor:'#fff', display:'flex'}}>
        <WrapperContainerLeft>
          <h1>GiayPro Xin Chào</h1>
          <p style={{fontSize:'16px'}}>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{marginBottom:'10px'}} placeholder="acb@gmail.com" value={email}
              onChange={handleOnchangeEmail}/>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color:'red', fontSize:'16px'}}>{data?.message}</span>}
          
            <ButtonComponent 
                disabled={!email.length || password.length < 8}
                onClick={handleSignIn}
                size={20} 
                bordered={false}
                styleButton={{
                  backgroundColor:'rgb(257, 57, 69)', 
                  height:'48px', 
                  width:'100%', 
                  border:'none',
                  margin:'26px 0 10px',
                  borderRadius:'4px'}}
                styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'600'}}
                textButton={'Đăng nhập'}>

              </ButtonComponent>
            
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            <p><span style={{fontSize:'13px'}}>Chưa có tài khoản?   </span><WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p> 
            
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imagelogo} preview={false} alt='imagelogo' height='203px' width='203px'/>
          <h3>Mua sắm tại GiayPro</h3>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage