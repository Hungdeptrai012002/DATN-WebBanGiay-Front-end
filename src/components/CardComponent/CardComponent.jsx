import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {StarFilled} from '@ant-design/icons'
import flag from '../../assets/images/flag.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, discount, selled, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCardStyle
      hoverable
      styles={{width:'200px', height:'200px', padding:'30px'}}
      style={{
        width: 220,
      }}
      cover={<img style={{width:'218px', paddingLeft:'1px'}} alt="example" src={image} />}
      onClick={()=> countInStock !== 0 && handleDetailsProduct(id)}
      disabled={countInStock === 0}
    >
      <img 
        src={flag} 
        alt='flag'
        style={{
          width:'54px' , 
          height:'18px', 
          position:"absolute", 
          top:'5px', 
          left:'-4px'}}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight:'4px'}}>
          <span >{rating}</span>
          <StarFilled style={{fontSize:'12px', color:'rgb(253, 216, 54)'}}/>
        </span>
        <WrapperStyleTextSell> | Đã bán {selled||100}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{marginRight:'8px'}}>{convertPrice(price)}</span>
        <WrapperDiscountText>-{discount||5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent