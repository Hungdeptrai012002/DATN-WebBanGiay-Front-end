import React from 'react'
import { WrapperInfo, Lable, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperListOrder, WrapperCountOrder } from './style';

import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';

import { useLocation, useNavigate } from 'react-router-dom';
import { orderContant } from '../../contant';

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const {state} = location
  // console.log('location', location)
  return (
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh', paddingTop:'0.1px'}}>
      <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold', display:'flex', justifyContent:'center', fontSize:'30px', color:'red'}}>Đặt hàng thành công!</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Đơn vị vận chuyển</Lable>
                
                  <WrapperValue style={{fontSize:'14px'}}>
                    <span style={{color:'#ea8500', fontWeight:'bold', fontSize:'16px'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
                
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
              <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue style={{fontSize:'14px'}}>
                    {orderContant?.payment[state?.payment]}
                  </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
                {state?.orderItems?.map((order) => {
                  return (
                    <WrapperListOrder>
                      <WrapperItemOrder key={order?.product}>
                        <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                          <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                          <div style={{
                            width: 260,
                            overflow: 'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:'nowrap',
                            fontSize:'16px'
                          }}>{order?.name}</div>
                        </div>
                        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <span>
                            <span style={{ color: '#242424', fontSize:'16px' }}>Giá tiền: {convertPrice(order?.price)}</span>
                          </span>
                          <span>
                            <span style={{ color: '#242424', fontSize:'16px', marginRight:'70px' }}>Số lượng: {order?.amount}</span>
                          </span>
                        </div>
                      </WrapperItemOrder>
                      
                    </WrapperListOrder>
                  )
                })}
            </WrapperInfo>
            <div>
              <span style={{ color: '', fontSize:'16px' }}>Phí vận chuyển: {convertPrice(state?.diliveryPriceMemo)}</span>
            </div>
            <div>
              <span style={{  color: 'red', fontSize:'16px' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </WrapperContainer>
          
        </div>
      </div>
      
    </div>
  )
}

export default PaymentPage