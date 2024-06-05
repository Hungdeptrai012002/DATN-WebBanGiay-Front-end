import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import * as OrderService from '../../services/OrderService';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { message } from 'antd';
import { useMutationHooks } from '../../hooks/useMutationHook';
import ModalComponent from './../../components/ModalComponent/ModalComponent';

const MyOrder = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Thêm state để lưu trữ đơn hàng được chọn

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token,
  });

  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/detailsorder/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems } = data;
      const res = OrderService.cancelOrder(id, token, orderItems);
      return res;
    }
  );

  const handleCancelDeleteOrder = () => {
    setIsModalOpenCancel(false);
  };

  const handleCancelOrder = () => {
    mutation.mutate(
      {
        id: selectedOrder?._id,
        token: state?.token,
        orderItems: selectedOrder?.orderItems,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
    setIsModalOpenCancel(false);
  };

  const { isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Huỷ đơn hàng thành công');
    } else if (isErrorCancel) {
      message.error('Huỷ đơn hàng thất bại');
    }
  }, [isErrorCancel, isSuccessCancel]);

  const renderProduct = (orderItems) => {
    return orderItems?.map((item) => (
      <WrapperHeaderItem key={item?.name}>
        <img
          src={item?.image}
          alt={item?.name}
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px',
          }}
        />
        <div
          style={{
            width: '260px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            marginLeft: '10px',
          }}
        >
          {item?.name}
        </div>
        <span style={{ fontSize: '14px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(item?.price)}</span>
      </WrapperHeaderItem>
    ));
  };

  return (
    <WrapperContainer>
      <div style={{ height: '100vh', width: '1270px', margin: '0 auto', paddingTop: '0.1px' }}>
        <h2>Đơn hàng của tôi</h2>
        <WrapperListOrder>
          {data?.map((order) => (
            <WrapperItemOrder key={order?._id}>
              <WrapperStatus>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Trạng thái</span>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '14px' }}>Giao hàng: </span>
                  {`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}
                </div>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                  {`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}
                </div>
              </WrapperStatus>
              {renderProduct(order?.orderItems)}
              <WrapperFooterItem>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                  <span style={{ fontSize: '14px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}>{convertPrice(order?.totalPrice)}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <ButtonComponent
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpenCancel(true);
                    }}
                    size={40}
                    styleButton={{
                      height: '36px',
                      border: '1px solid rgb(11, 116, 229)',
                      borderRadius: '4px',
                    }}
                    textButton={'Huỷ đơn hàng'}
                    styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                  />
                  <ButtonComponent
                    onClick={() => handleDetailsOrder(order?._id)}
                    size={40}
                    styleButton={{
                      height: '36px',
                      border: '1px solid rgb(11, 116, 229)',
                      borderRadius: '4px',
                    }}
                    textButton={'Xem chi tiết'}
                    styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                  />
                </div>
              </WrapperFooterItem>
            </WrapperItemOrder>
          ))}
        </WrapperListOrder>
        <ModalComponent forceRender title="Huỷ đơn hàng" open={isModalOpenCancel} onCancel={handleCancelDeleteOrder} onOk={handleCancelOrder}>
          <div>Bạn có chắc muốn huỷ đơn hàng này không?</div>
        </ModalComponent>
      </div>
    </WrapperContainer>
  );
};

export default MyOrder;
