import React, { useState } from 'react'
import {Menu} from 'antd'
import { AppstoreOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { getItem } from '../../utils';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <FileTextOutlined />),
      ];
    const [theme, setTheme] = useState('light');
    const [current, setCurrent] = useState('');
    const renderPage = (key) => {
        switch(key){
            case 'user':
                return(
                    <AdminUser/>
                )
            case 'product':
                return(
                    <AdminProduct/>
                )
            case 'order':
            return(
                <AdminOrder/>
            )
            default:
                return <></>
        }
    }
    const handleOnClick = ({  key}) => {
      setCurrent(key);
    };
  return (
    <>
        <HeaderComponent idHiddenSearch isHiddenCart/>
        <div style={{display:'flex'}}>
            
            <Menu
                theme={theme}
                onClick={handleOnClick}
                style={{
                    width: '256px',
                    height: '100vh',
                    boxShadow: '1px 1px 2px #ccc',
                }}
                
                selectedKeys={[current]}                                                    
                mode="inline"
                items={items}
            />
            <div style={{flex:1, padding:'15px'}}>
                {renderPage(current)}
            </div>
        </div>
    </>)
}

export default AdminPage