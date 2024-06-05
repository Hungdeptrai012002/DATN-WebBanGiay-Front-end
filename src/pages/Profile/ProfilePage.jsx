import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { Button } from "antd";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useSelector, useDispatch } from 'react-redux';
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { updateUser } from '../../redux/slices/userSlice';
import { UploadOutlined } from '@ant-design/icons';
import  {getBase64}  from '../../utils';


const ProfilePage = () => {
  const user = useSelector((state) =>state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')
  const mutation = useMutationHooks(
    (data) => {
      const { id, access_token, ...rests } = data
      UserService.updateUser(id, rests, access_token)
    }
  )
  const dispatch = useDispatch()
  const { data } = mutation
  // console.log("data", data)
  useEffect(()=> {
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  },[user])
  

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
}
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangePhone = (value) => {
    setPhone(value)
  
  }
  const handleOnchangeAddress = (value) => {
    setAddress(value)
  
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }
  const handleUpdateProfile = () => {
    mutation.mutate(
        { 
            id: user?.id, 
            name, 
            email, 
            phone, 
            address, 
            avatar, 
            access_token: user?.access_token
        },
        {
            onSuccess: () => {
                message.success();
                handleGetDetailsUser(user?.id, user?.access_token);
            },
            onError: (error) => {
                message.error();
                console.error('Error updating profile:', error);
            }
        }
    );
};

  return (
    <div style={{width:'1270px', margin:'0 auto', height:'500px'}}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLable htmlFor='name'>Name</WrapperLable>
            <InputForm style={{width:'300px'}} id='name' value={name} onChange={handleOnchangeName}/>
            <ButtonComponent 
                onClick={handleUpdateProfile}
                size={20} 
                bordered={false}
                styleButton={{
                  height:'fit-content', 
                  width:'fit-content', 
                  border:'1px solid rgb(26, 148, 255)',
                  borderRadius:'4px'}}
                styleTextButton={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600'}}
                textButton={'Cập nhật'}>

              </ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor='email'>Email</WrapperLable>
            <InputForm style={{width:'300px'}} id='email' value={email} onChange={handleOnchangeEmail}/>
            <ButtonComponent 
                onClick={handleUpdateProfile}
                size={20} 
                bordered={false}
                styleButton={{
                  height:'fit-content', 
                  width:'fit-content', 
                  border:'1px solid rgb(26, 148, 255)',
                  borderRadius:'4px'}}
                styleTextButton={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600'}}
                textButton={'Cập nhật'}>

              </ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor='phone'>Phone</WrapperLable>
            <InputForm style={{width:'300px'}} id='phone' value={phone} onChange={handleOnchangePhone}/>
            <ButtonComponent 
                onClick={handleUpdateProfile}
                size={20} 
                bordered={false}
                styleButton={{
                  height:'fit-content', 
                  width:'fit-content', 
                  border:'1px solid rgb(26, 148, 255)',
                  borderRadius:'4px'}}
                styleTextButton={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600'}}
                textButton={'Cập nhật'}>

              </ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor='address'>Address</WrapperLable>
            <InputForm style={{width:'300px'}} id='address' value={address} onChange={handleOnchangeAddress}/>
            <ButtonComponent 
                onClick={handleUpdateProfile}
                size={20} 
                bordered={false}
                styleButton={{
                  height:'fit-content', 
                  width:'fit-content', 
                  border:'1px solid rgb(26, 148, 255)',
                  borderRadius:'4px'}}
                styleTextButton={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600'}}
                textButton={'Cập nhật'}>

              </ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor='avatar'>Avatar</WrapperLable>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar &&(
              <img src={avatar} style={{
                height:'60px',
                width:'60px',
                borderRadius:'50%',
                objectFit:'cover'
              }} alt='avatar'/>
            )}
            {/* <InputForm style={{width:'300px'}} id='avatar' value={avatar} onChange={handleOnchangeAvatar}/> */}
            <ButtonComponent 
                onClick={handleUpdateProfile}
                size={20} 
                bordered={false}
                styleButton={{
                  height:'fit-content', 
                  width:'fit-content', 
                  border:'1px solid rgb(26, 148, 255)',
                  borderRadius:'4px'}}
                styleTextButton={{color:'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600'}}
                textButton={'Cập nhật'}>

              </ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
        
    </div>
  )
}

export default ProfilePage