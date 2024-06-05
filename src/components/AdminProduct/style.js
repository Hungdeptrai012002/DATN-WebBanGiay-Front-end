import { styled } from 'styled-components';
import { Upload } from 'antd';
export const WrapperHeader = styled.h1`
    color:#000;
    font-size: 20px;
`;
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-list-item.ant-upload-list-item-error{
        display: none;
    }
    
    & .ant-upload.ant-upload-select{
        margin-top: 15px;
        margin-right: 15px;
    }
`;