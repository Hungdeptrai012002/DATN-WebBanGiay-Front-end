import React from 'react'
import {Button} from 'antd'
const ButtonComponent = ({size, bordered, styleButton, styleTextButton, textButton, ...rests}) => {
  return (
    <Button 
        size={size} 
        // icon={<SearchOutlined style={{color:colorButton}}/>} 
        style={styleButton} 
        {...rests}
    >
        <span style={styleTextButton}>{textButton}</span> </Button>
  )
}

export default ButtonComponent