import styled from 'styled-components';

export const WrapperHeaderUser = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const WrapperInfoUser = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 30%;
  font-size: 14px;
`;

export const WrapperLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const WrapperContentInfo = styled.div`
  .name-info, .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info, .status-payment {
    margin-bottom: 5px;
  }

  .address-info span, .phone-info span, .delivery-fee span {
    font-weight: bold;
  }
`;

export const WrapperStyleContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const WrapperItemLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  text-align: center;
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const WrapperItem = styled.div`
  font-size: 14px;
  text-align: center;
  width: 100px;
`;

export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;

  & > div {
    margin-left: 20px;
  }
`;
