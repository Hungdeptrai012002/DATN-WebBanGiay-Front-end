import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import imagelogo from '../../assets/images/logo-login.png'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )
  const {data, isSuccess, isError } = mutation

  useEffect(() =>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleSignUp = () =>{
    mutation.mutate({email, password, confirmPassword})
    // console.log("signUp", email, password, confirmPassword)
  }
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0, 0, 0, 0.53)', height:'100vh'}}>
      <div style={{ width:'800px', height:'445px', borderRadius:'6px', backgroundColor:'#fff', display:'flex'}}>
        <WrapperContainerLeft>
          <h1>GiayPro Xin Chào</h1>
          <p style={{fontSize:'16px'}}>Đăng ký</p>
          <InputForm style={{marginBottom:'10px'}} placeholder="acb@gmail.com" value={email} onChange={handleOnchangeEmail}/>
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
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color:'red', fontSize:'16px'}}>{data?.message}</span>}
          <ButtonComponent
              disabled={!email.length || password.length < 8 || confirmPassword.length < 8}
              onClick={handleSignUp}
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
              textButton={'Đăng ký'}>

            </ButtonComponent>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p> 
            
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imagelogo} preview={false} alt='imagelogo' height='203px' width='203px'/>
          <h3>Mua sắm tại GiayPro</h3>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage