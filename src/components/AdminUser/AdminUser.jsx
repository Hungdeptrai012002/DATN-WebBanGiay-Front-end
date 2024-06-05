import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import * as message from '../../components/Message/Message'
import ModalComponent from '../ModalComponent/ModalComponent';
import { getBase64 } from '../../utils';
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const user = useSelector((state)=> state?.user)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const inittial = () => ({
    name: '',
    email: '',
    isAdmin: false,
    phone: '',
    avatar: '',
    address: '',
  })
  const [stateUser, setStateUser] = useState(inittial())
  const [stateUserDetails, setStateUserDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return UserService.updateUser(id, { ...rests }, token);
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id, token} = data;
    return UserService.deleteUser(id, token);
  });
  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids} = data;
    return UserService.deleteUserMany(ids, token);
  });
  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
      onSettled:()=>{
        queryUser.refetch()
      }
    })
    setIsModalOpenDelete(false)
  }
  
  const { data, isSuccess, isError } = mutation
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    return res
  }
  const queryUser = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
  const { data: users } = queryUser
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        address: res?.data?.address,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        avatar: res?.data?.avatar,
      })
    }
  }
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])
  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateUserDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateUserDetails, isModalOpen])


  const handleEditUser = () => {
    setIsOpenDrawer(true);
  };
  const renderAction = () => {
    return(
      <div>
        <EditOutlined style={{fontSize:'25px', color:'orange', marginRight:'50px', cursor:'pointer'}} onClick={handleEditUser}/>
        <DeleteOutlined style={{fontSize:'25px', color:'red', cursor:'pointer'}} onClick={()=> setIsModalOpenDelete(true)}/>
      </div>
    )
  }
  

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps('address')
    },
    {
      title: "roleAdmin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if(value === true){
          return record.isAdmin = true
        }else if(value === false){
          return record.isAdmin = false
        }
      },
    },
    {
        title: "Phone",
        dataIndex: "phone",
        ...getColumnSearchProps('phone')
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        avatar ? (
          <img src={avatar} alt="Avatar" style={{ width: 100, height: 100 }} />
        ) : (
          <span>No Avatar</span>
        )
      ),
      ...getColumnSearchProps('avatar')
    },
    {
        title: "Action",
        dataIndex: "Action",
        render: renderAction,
    },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? 'true' : 'false'
    }
  })
  useEffect(() =>{
    if(isSuccess && data?.status === 'OK'){
      message.success()
      handleCancel()
    }else if(isError){
      message.error()
    }
  },[isSuccess])
  useEffect(() =>{
    if(isSuccessDeleted && dataDeleted?.status === 'OK'){
      message.success()
      handleCancelDelete()
    }else if(isErrorDeleted){
      message.error()
    }
  },[isSuccessDeleted])
  useEffect(() =>{
    if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
      message.success()
    }else if(isErrorDeletedMany){
      message.error()
    }
  },[isSuccessDeletedMany])
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCancelDrawer()
    } else if(isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])
  const onFinish = () => {
    mutation.mutate(stateUser,{
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  const handleDeleteUser = () =>{
    mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
      onSettled:()=>{
        queryUser.refetch()
      }
    })
    setIsModalOpenDelete(false)
  }
  const handleCancelDelete= () => {
    setIsModalOpenDelete(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setStateUser({
    name: '',
    email: '',
    isAdmin: false,
    phone: '',
    avatar: '',
    address: '',})
    form.resetFields()
  }
  const handleCancelDrawer = () => {
    setIsOpenDrawer(false)
    setStateUserDetails({
    name: '',
    email: '',
    isAdmin: false,
    phone: '',
    avatar: '',
    address: '',})
    form.resetFields()
  }
  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    })
  }
  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    });
    form.setFieldsValue({ [name]: value });
  }
  const onUpdateUser = () =>{
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails },{
      onSettled: () => {
        queryUser.refetch()
      }
    } )
  }
  // console.log("data", data)
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview
    })
  }
  const handleOnchangeAvatarDetails = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })
  }
  return (
    <div>
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
        
        <div style={{marginTop:'15px'}}>
        <TableComponent
          columns={columns}
          data={dataTable}
          handleDeleteMany={handleDeleteManyUser}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                if (record._id) {
                  setRowSelected(record._id)
                } else {
                  console.error('Record ID is undefined!')
                }
              }, 
            };
          }}
        />
        </div>
        
        <DrawerComponent title='Thông tin người dùng' isOpen={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)} width='500px' style={{marginRight:'500px'}}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onUpdateUser}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email"/>
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"/>
            </Form.Item>
            <Form.Item
              label="roleAdmin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: 'Please input your roleAdmin!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails?.isAdmin} onChange={handleOnchangeDetails} name="isAdmin"/>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails?.address} onChange={handleOnchangeDetails} name="address"/>
            </Form.Item>
            
            <Form.Item
              label="Avatar"
              name="avatar"
              
              
            >
              <div style={{display:'flex'}}>

              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                  <Button >Select File</Button>
              </WrapperUploadFile>
                {stateUserDetails?.avatar &&(
                  <img src={stateUserDetails?.avatar} style={{
                    height:'60px',
                    width:'60px',
                    borderRadius:'50%',
                    objectFit:'cover'
                  }} alt='Avatar'/>
                )}
              </div>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 4,
              }}
            >
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>
        <ModalComponent forceRender title="Xoá người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
          <div>Bạn có chắc muốn xoá tài khoản này không?</div>
        </ModalComponent>
    </div>
  )
}

export default AdminUser