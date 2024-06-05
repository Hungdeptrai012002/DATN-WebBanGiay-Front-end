import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query';
import {  SearchOutlined } from '@ant-design/icons';
import { orderContant } from '../../contant';
import ChartComponent from './ChartComponent';


function AdminOrder() {
  const [rowSelected, setRowSelected] = useState('');
  const user = useSelector((state) => state?.user);

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
  });
  const [stateUser, setStateUser] = useState(inittial());
  const [stateUserDetails, setStateUserDetails] = useState(inittial());

  const [form] = Form.useForm();




  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };
  const queryOrder = useQuery({
    queryKey: ['order'],
    queryFn: getAllOrder,
  });
  const { data: orders } = queryOrder;
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await OrderService.getAllOrder(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        address: res?.data?.address,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        avatar: res?.data?.avatar,
      });
    }
  };



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
          }} />
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
            } }
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
        }} />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });



  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps('address')
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "itemsPrice",
      sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
      ...getColumnSearchProps('itemsPrice')
    },
    {
      title: "Phí giao hàng",
      dataIndex: "shippingPrice",
      sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
      ...getColumnSearchProps('shippingPrice')
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",

      ...getColumnSearchProps('isPaid')
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      ...getColumnSearchProps('paymentMethod')
    },
  ];
  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {
      ...order,
      key: order._id,
      userName: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
      paymentMethod: orderContant.payment[order?.paymentMethod],
      type:order?.orderItems?.type,
    };
  });



  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ width: '200px', height: '200px' }}>
        <ChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '15px' }}>
        <TableComponent
          columns={columns}
          data={dataTable} />
      </div>

    </div>
  );
}

export default AdminOrder