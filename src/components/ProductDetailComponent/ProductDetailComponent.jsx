import React from 'react'
import { Row, Col, Image } from 'antd';
import ImageProduct from '../../assets/images/test.webp'
import ImageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperAddressPriceProduct, WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperTextPriceProduct } from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from './../ButtonComponent/ButtonComponent';

const ProductDetailComponent = () => {
  const onChange =()=>{}
  return (
    <Row style={{padding:'16px', background:'#fff'}}>
      <Col span={10} style={{borderRight:'1px solid #e5e5e5', paddingRight:'8px', borderRadius:'4px'}}>
        <Image src={ImageProduct} alt='imageproduct' preview={false}/>
        <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
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
      <Col span={14} style={{paddingLeft:'10px'}}>
        <WrapperStyleNameProduct>Ten san pham</WrapperStyleNameProduct>
        <div>
          <StarFilled style={{fontSize:'12px', color:'rgb(253, 216, 54)'}}/>
          <StarFilled style={{fontSize:'12px', color:'rgb(253, 216, 54)'}}/>
          <StarFilled style={{fontSize:'12px', color:'rgb(253, 216, 54)'}}/>
          <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperTextPriceProduct>200.000</WrapperTextPriceProduct>
        </WrapperPriceProduct>
        <WrapperAddressPriceProduct>
          <span>Giao đến </span>
          <span className='address'>Bắc Ninh</span>-
          <span className='change-address'>Đổi địa chỉ</span>
        </WrapperAddressPriceProduct>
        <div style={{margin:'1px 0 15px',borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5', padding:'15px 0'}}>
          <div style={{marginBottom:'10px'}}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{border:'none', background:'transparent'}}>
              <MinusOutlined style={{color:"#000", fontSize:'14px'}} />
            </button>
            <WrapperInputNumber defaultValue={1} onChange={onChange} size='small' style={{width:'30px'}}/>
            <button style={{border:'none',  background:'transparent'}}>
              <PlusOutlined style={{color:"#000", fontSize:'14px'}} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'15px 0'}}>
          <ButtonComponent 
          size={20} 
          bordered={false}
          styleButton={{
            backgroundColor:'rgb(257, 57, 69)', 
            height:'48px', 
            width:'220px', 
            border:'none',
            
            borderRadius:'4px'}}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'600'}}
          textButton={'Chọn mua'}>

          </ButtonComponent>
          <ButtonComponent 
          size={20} 
          bordered={false}
          styleButton={{
            backgroundColor:'#fff', 
            height:'48px', 
            width:'220px', 
            
            border:'2px solid rgb(13, 92, 182)', 
            borderRadius:'4px'}}
          styleTextButton={{color:'rgb(13, 92, 182)', fontSize:'15px'}}
          textButton={'Mua trước trả sau'}>

          </ButtonComponent>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailComponent