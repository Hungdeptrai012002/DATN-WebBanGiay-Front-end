import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import {Checkbox, Rate} from 'antd'
const NavbarComponent = () => {
    const onChange =()=>{ }
    const renderContent = (type, options) =>{
        switch (type) {
            case 'text':
                return options.map((option)=>{
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option)=>{
                            return(
                                <Checkbox style={{marginLeft:0}} value={option.value}>{option.lable}</Checkbox>
                                
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ dispaly: 'flex', fontSize:'12px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`từ ${option}  sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }
  return (
    <div>
        <WrapperLableText>Lable</WrapperLableText>
        <WrapperContent>
            {renderContent('text', ['Giày Nam', 'Giày Nữ', 'Giày Trẻ Em', 'Dép Nam', 'Dép Nữ', 'Dép Trẻ Em'])}
        </WrapperContent>
        {/* <WrapperContent>
            {renderContent('checkbox', [
                {value:'a', lable:"A"},
                {value:'b', lable:"B"},
            ])}
        </WrapperContent>
        <WrapperContent>
            {renderContent('star', [3, 4, 5])}
        </WrapperContent>
        <WrapperContent>
            {renderContent('price', ['dưới 40.000', 'trên 50.000'])}
        </WrapperContent> */}
    </div>
  )
}

export default NavbarComponent