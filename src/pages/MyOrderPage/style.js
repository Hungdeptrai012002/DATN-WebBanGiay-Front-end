import styled from "styled-components";

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;

`;
export const WrapperStatus = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction: column;
`;
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;
export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`;
export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;
export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 1px solid #eee;
    padding: 2px;
  }

  div {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    font-size: 14px;
  }

  span {
    font-size: 14px;
    color: #242424;
    margin-left: auto;
  }
`;
