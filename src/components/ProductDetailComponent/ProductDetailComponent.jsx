import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Image, Rate, message } from 'antd';
import ImageProductSmall from '../../assets/images/imagesmall.webp';
import * as ProductService from '../../services/ProductService';
import { 
  WrapperAddressPriceProduct, 
  WrapperInputNumber, 
  WrapperPriceProduct, 
  WrapperQualityProduct, 
  WrapperStyleColImage, 
  WrapperStyleImageSmall, 
  WrapperStyleNameProduct, 
  WrapperStyleTextSell, 
  WrapperTextPriceProduct 
} from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from './../ButtonComponent/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slices/orderSlice';
import { convertPrice, initFacebookSDK } from '../../utils';
import LikeButton from '../LikeButton/LikeButton';
import CommentComponent from '../CommentComponent/CommentComponent';

const ProductDetailComponent = ({idProduct}) => {
  const user = useSelector((state) => state?.user);
  const orderItems = useSelector(state => state?.order?.orderItems);
  const productOrder = orderItems.find(item => item.product === idProduct);
  const [numProduct, setNumProduct] = useState(productOrder ? productOrder.amount : 1);

  const onChange = (value) => {
    const numericValue = Number(value);
    if (numericValue > 0 && numericValue <= productDetails?.countInStock) {
      setNumProduct(numericValue);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const handleChangeCount = (type) => {
    if (type === 'increase' && numProduct < productDetails?.countInStock) {
      setNumProduct(numProduct + 1);
    } else if (type === 'decrease' && numProduct > 0) {
      setNumProduct(numProduct - 1);
    }
  };

  const handleAddOrder = () => {
    if (!user?.id) {
      navigate('/sign-in', {state: location?.pathname});
    } else {
      message.success('Đã thêm vào giỏ hàng');
      dispatch(addOrderProduct({
        orderItem: {
          name: productDetails?.name,
          amount: numProduct,
          type: productDetails?.type,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id,
          discount: productDetails?.discount,
          countInstock: productDetails?.countInStock
        }
      }));
    }
  };

  const {isLoading, data: productDetails } = useQuery({ 
    queryKey: ['product-details', idProduct], 
    queryFn: fetchGetDetailsProduct, 
    QueryClient: {enabled: !!idProduct}
  });
  
  return (
    <Row style={{padding: '16px', background: '#fff'}}>
      <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px', borderRadius: '4px'}}>
        <Image src={productDetails?.image} alt='imageproduct' preview={false}/>
        <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={ImageProductSmall} alt='productsmall' preview={false}/>
            </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{paddingLeft: '10px'}}>
        <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
        <div>
          <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
          <WrapperStyleTextSell> | Đã bán {productDetails?.selled}+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperTextPriceProduct>{convertPrice(productDetails?.price)}</WrapperTextPriceProduct>
        </WrapperPriceProduct>
        <WrapperAddressPriceProduct>
          <span>Giao đến </span>
          <span className='address'>{user?.address}</span>-
          <span className='change-address'>Đổi địa chỉ</span>
        </WrapperAddressPriceProduct>
        <LikeButton href= {'https://developers.facebook.com/docs/plugins/'}/>
        <div style={{margin: '1px 0 15px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '15px 0'}}>
          <div style={{marginBottom: '10px'}}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease')}>
              <MinusOutlined style={{color: "#000", fontSize: '14px'}} />
            </button>
            <WrapperInputNumber 
              min={1} 
              max={productDetails?.countInStock} 
              value={numProduct} 
              onChange={onChange} 
              size='small' 
              style={{width: '30px'}} 
            />
            <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}>
              <PlusOutlined style={{color: "#000", fontSize: '14px'}} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 0'}}>
          <ButtonComponent 
            size={20} 
            bordered={false}
            styleButton={{
              backgroundColor: 'rgb(257, 57, 69)', 
              height: '48px', 
              width: '220px', 
              border: 'none',
              borderRadius: '4px'
            }}
            onClick={handleAddOrder}
            styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '600'}}
            textButton={'Chọn mua'}
          />
          
          <ButtonComponent 
            size={20} 
            bordered={false}
            styleButton={{
              backgroundColor: '#fff', 
              height: '48px', 
              width: '220px', 
              border: '2px solid rgb(13, 92, 182)', 
              borderRadius: '4px'
            }}
            styleTextButton={{color: 'rgb(13, 92, 182)', fontSize: '15px'}}
            textButton={'Mua trước trả sau'}
          />
        </div>
      </Col>
      <CommentComponent href={'https://developers.facebook.com/docs/plugins/comments#configurator'} width="1270"/>
    </Row>
  );
};

export default ProductDetailComponent;
