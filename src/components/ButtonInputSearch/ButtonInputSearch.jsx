import React from 'react'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import {
    SearchOutlined,
  } from '@ant-design/icons'
const ButtonInputSearch = (props) => {
  const {size, placeholder, textButton, bordered, backgroundColorInput='#fff', backgroundColorButton ='rgb(27, 104, 181)', colorButton='#fff' } = props  
  return (
    <div style={{display:'flex'}} >
        <InputComponent 
            size={size} 
            placeholder={placeholder} 
            style={{backgroundColor:backgroundColorInput, border:'none'}} 
            
            {...props}
        />
        <ButtonComponent 
            size={size} 
            bordered={bordered} 
            icon={<SearchOutlined style={{color:colorButton}}/>} 
            styleButton={{backgroundColor:backgroundColorButton, border: !bordered && 'none'}}
            styleTextButton={{color:colorButton}}
            textButton={textButton}
        >
        </ButtonComponent>
    </div>

  )
}

export default ButtonInputSearch