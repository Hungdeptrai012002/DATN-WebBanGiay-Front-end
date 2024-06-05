import styled from 'styled-components'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
    justify-content: flex-start;
    font-size: 13px;
    height: 44px;
    background-color: white !important;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
    & .ant-card.ant-card-bordered.ant-card-hoverable{
        margin: 0px !important;
        margin-left: 15px !important;
    }
`;