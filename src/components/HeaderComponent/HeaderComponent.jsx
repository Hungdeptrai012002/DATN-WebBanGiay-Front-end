import React from 'react'
import { Col, Badge } from 'antd';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import {WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall,} from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

const HeaderComponent = () => {
  return (
    <div>
        <WrapperHeader>
            <Col span={6}>
                <WrapperTextHeader>GiayDep</WrapperTextHeader>
            </Col>
            <Col span={12}>
            <ButtonInputSearch
                size="large"
                bordered={false}
                textButton="Tìm kiếm"
                placeholder="input search text"
                
                // onSearch={onSearch}
            />
            </Col>
            <Col span={6} style={{display:'flex', gap:'20px', alignItems:'center'}}>
            <WrapperHeaderAccount>
                <UserOutlined style={{fontSize:'30px'}}/>
                <div>
                    <WrapperTextHeaderSmall>Đăng nhập/ Đăng kí</WrapperTextHeaderSmall>
                    <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                    </div>
                </div>
            </WrapperHeaderAccount>
            <div>
                <Badge count={4} size='small'>

                    <ShoppingCartOutlined style={{fontSize:'30px', color:'#fff',}}/>
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
            </Col>
        </WrapperHeader>
    </div>
  )
}

export default HeaderComponent