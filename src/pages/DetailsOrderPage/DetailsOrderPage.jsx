import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['ordersDetails'],
    queryFn: fetchDetailsOrder,
  });

  const { isLoading, data, error } = queryOrder;
//   console.log('datta', data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  const { shippingAddress, orderItems, shippingPrice, paymentMethod, isPaid, totalPrice } = data;
  return (
    <div style={{ width: '100%', height: '100vh', background: '#f5f5fa' , paddingTop:'0.1px'}}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h2>Chi tiết đơn hàng</h2>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>{shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span>{`${shippingAddress?.address} ${shippingAddress?.city}`}</div>
              <div className='phone-info'><span>Điện thoại: </span>{shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='delivery-name'><span style={{color:'#ea8500', fontWeight:'bold'}}>FAST</span> Giao hàng tiết kiệm </span></div>
              <div className='delivery-fee'><span>Phí giao hàng: </span>{shippingPrice}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant[paymentMethod]}</div>
              <div className='status-payment'>{isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '350px', fontSize:'14px', fontWeight:'bold' }}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>
          {orderItems?.map((order) => {
            return (
              <WrapperProduct key={order.id}>
                <WrapperNameProduct>
                  <img src={order?.image}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px',
                    height: '70px'
                  }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{convertPrice((order?.price) * (order?.amount))}</WrapperItem>
                <WrapperItem>{convertPrice((order?.discount) * (order?.price) * (order?.amount) / 100)}</WrapperItem>
              </WrapperProduct>
            )
          })}
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển: </WrapperItemLabel>
            <WrapperItem>{convertPrice(shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng: </WrapperItemLabel>
            <WrapperItem style={{color:'red'}}>{convertPrice(totalPrice)}</WrapperItem>
          </WrapperAllPrice>
        </WrapperStyleContent>
      </div>
    </div>
  );
}

export default DetailsOrderPage;
