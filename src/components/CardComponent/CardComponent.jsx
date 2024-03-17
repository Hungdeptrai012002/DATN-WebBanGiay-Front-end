import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {StarFilled} from '@ant-design/icons'
import flag from '../../assets/images/flag.png'

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{width:'200px', height:'200px'}}
      style={{
        width: 200,
      }}
      bodyStyle={{padding:'10px'}}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <img 
        src={flag} 
        alt='flag'
        style={{
          width:'54px', 
          height:'18px', 
          position:"absolute", 
          top:'5px', 
          left:'-4px'}}
      />
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight:'4px'}}>
          <span >4.95</span>
          <StarFilled style={{fontSize:'12px', color:'rgb(253, 216, 54)'}}/>
        </span>
        <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ
        <WrapperDiscountText>-8%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent