import React from 'react'
import NavbarComponent from './../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Row, Pagination, Col } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';

const TypeProductPage = () => {
  const onChange = ()=> {}
  return (
    <div style={{padding:'0 120px', background:'#efefef',}}>
        <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
            <WrapperNavbar span={4} >
                <NavbarComponent/>
            </WrapperNavbar>
            <Col span={20}>
                <WrapperProducts >
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts>
                <Pagination style={{textAlign:'center', marginTop:'10px'}} defaultCurrent={2} total={100} onChange={onChange} />

            </Col>
        </Row>
    </div>
  )
}

export default TypeProductPage