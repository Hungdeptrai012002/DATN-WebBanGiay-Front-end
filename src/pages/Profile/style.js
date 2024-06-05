import { styled } from 'styled-components';
import { Upload } from 'antd';
export const WrapperHeader = styled.h1`
    color:#000;
    font-size: 20px;
    margin: 4px 0;
`;
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width:500px;
    margin:0 auto;
    padding:20px;
    border-radius: 10px;
    gap:30px;
`;
export const WrapperLable = styled.label`
    color:#000;
    font-size:16px;
    line-height:20px;
    font-weight:600;
    width:50px;
    text-align:left;
`;  
export const WrapperInput = styled.div`
    display:flex;
    align-items: center;
    gap:20px;
`;
export const WrapperUploadFile = styled(Upload)`
    
    & .ant-upload-list-item.ant-upload-list-item-error{
        display: none;
    }
`;