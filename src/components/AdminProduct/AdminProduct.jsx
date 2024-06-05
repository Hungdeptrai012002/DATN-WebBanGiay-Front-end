import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Select, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64, renderOptions } from '../../utils';
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import {DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';


const AdminProduct = () => {
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
    price: '',
    description: '',
    rating: '',
    discount:'',
    image: '',
    type: '',
    newType:'',
    countInStock: '',
  })
  const [stateProduct, setStateProduct] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    data => ProductService.createProduct(data)
  )
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return ProductService.updateProduct(id, { ...rests }, token);
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id, token} = data;
    return ProductService.deleteProduct(id, token);
  });
  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids} = data;
    return ProductService.deleteProductMany(ids, token);
  });
  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
      onSettled:()=>{
        queryProduct.refetch()
      }
    })
    setIsModalOpenDelete(false)
  }
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllType()
    return res
  }
  const { data, isSuccess, isError } = mutation
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const queryProduct = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
  const { data: products } = queryProduct
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      })
    }
  }
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])
  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateProductDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateProductDetails, isModalOpen])


  const handleEditProduct = () => {
    setIsOpenDrawer(true);
  };
  const renderAction = () => {
    return(
      <div>
        <EditOutlined style={{fontSize:'25px', color:'orange', marginRight:'50px', cursor:'pointer'}} onClick={handleEditProduct}/>
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
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 200',
          value: '>=',
        },
        {
          text: '<= 200',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if(value === '>='){
          return record.price >= 200
        }else if(value === '<='){
          return record.price <= 200
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '1',
          value: '1',
        },
        {
          text: '2',
          value: '2',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '4',
          value: '4',
        },
        {
          text: '5',
          value: '5',
        },
      ],
      onFilter: (value, record) => {
        if(value === '1'){
          return record.rating <= 1
        }else if(value === '2'){
          return record.rating <= 2
        }else if(value === '3'){
          return record.rating <= 3
        }else if(value === '4'){
          return record.rating <= 4
        }else if(value === '5'){
          return record.rating <= 5
        }
      },
    },
    {
        title: "Type",
        dataIndex: "type",
    },
    {
        title: "Action",
        dataIndex: "Action",
        render: renderAction,
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {
        ...product,
        key: product._id
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
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleDeleteProduct = () =>{
    mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
      onSettled:()=>{
        queryProduct.refetch()
      }
    })
    setIsModalOpenDelete(false)
  }
  const handleCancelDelete= () => {
    setIsModalOpenDelete(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({name:'', type:'', price:'', countInStock:'', description:'', rating:'', image:'', discount:''})
    form.resetFields()
  }
  const handleCancelDrawer = () => {
    setIsOpenDrawer(false)
    setStateProductDetails({name:'', type:'', price:'', countInStock:'', description:'', rating:'', image:'', discount:''})
    form.resetFields()
  }
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }
  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    });
    form.setFieldsValue({ [name]: value });
  }
  const onUpdateProduct = () =>{
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails },{
      onSettled: () => {
        queryProduct.refetch()
      }
    } )
  }
  // console.log("data", data)
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }
  const handleOnchangeAvatarDetails = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
  }
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value
    })
}
  return (
    <div>
        <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
        <div style={{marginTop:'10px'}}> 
            <Button onClick={()=> setIsModalOpen(true)} type="primary" style={{height:"fit-content", width:'fit-content', background:'rgb(26, 148, 255)', color:'#fff'}}>Thêm sản phẩm</Button>
        </div>
        <div style={{marginTop:'15px'}}>
        <TableComponent
          columns={columns}
          data={dataTable}
          handleDeleteMany={handleDeleteManyProduct}
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
        <ModalComponent forceRender title="Thêm sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            
            onFinish={onFinish}
            
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
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name"/>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
                />
            </Form.Item>
            {stateProduct.type === 'add_type' && (
              <Form.Item
                label='New type'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
            </Form.Item>
            <Form.Item
              label="Count InStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your count inStock!',
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!',
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input your discount!',
                },
              ]}
            >
              <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount"/>
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your image!',
                },
              ]}
              
            >
              <div style={{display:'flex'}}>

              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                  <Button >Select File</Button>
              </WrapperUploadFile>
                {stateProduct?.image &&(
                  <img src={stateProduct?.image} style={{
                    height:'60px',
                    width:'60px',
                    borderRadius:'50%',
                    objectFit:'cover'
                  }} alt='imagePro'/>
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
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>
        <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)} width='500px' style={{marginRight:'500px'}}>
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
          onFinish={onUpdateProduct}
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
            <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type"/>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price"/>
            </Form.Item>
            <Form.Item
              label="Count InStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your count inStock!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails?.countInStock} onChange={handleOnchangeDetails} name="countInStock"/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails?.description} onChange={handleOnchangeDetails} name="description"/>
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails?.rating} onChange={handleOnchangeDetails} name="rating"/>
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input your discount of product!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails?.discount} onChange={handleOnchangeDetails} name="discount"/>
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your image!',
                },
              ]}
              
            >
              <div style={{display:'flex'}}>

              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                  <Button >Select File</Button>
              </WrapperUploadFile>
                {stateProductDetails?.image &&(
                  <img src={stateProductDetails?.image} style={{
                    height:'60px',
                    width:'60px',
                    borderRadius:'50%',
                    objectFit:'cover'
                  }} alt='imagePro'/>
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
        <ModalComponent forceRender title="Xoá sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
          <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
        </ModalComponent>
    </div>
  )
}

export default AdminProduct