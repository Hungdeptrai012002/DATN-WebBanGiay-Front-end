import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'
const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: 'calc(100%)', paddingTop: '0.1px'}}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        <h3><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h3>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailPage