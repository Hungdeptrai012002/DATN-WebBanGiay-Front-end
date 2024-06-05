import React, { useEffect, useState } from "react";
import { Col, Badge, Popover } from "antd";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { searchProduct } from "../../redux/slices/productSlice";

const HeaderComponent = ({ idHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false);
  const order = useSelector((state) => state.order)
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("myorder")}>
        Đơn hàng của tôi
      </WrapperContentPopup><WrapperContentPopup onClick={()=>handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  const handleClickNavigate = (type) => {
    if(type==='profile'){
      navigate("/profile-user")
    }else if(type==='admin'){
      navigate("/system/admin")
    }else if(type==='myorder'){
      navigate("/myorder",{state:{
        id:user?.id,
        token:user?.access_token
    }})
    }else{
      handleLogout()
    }
    setIsOpenPopup(false)
  }
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "rgb(26, 148, 255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            idHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={6}>
          <WrapperTextHeader onClick={() => navigate("/")}>
          <img
                src='logoreal.png'
                alt="logo"
                style={{width:'130px'}}
              />
          </WrapperTextHeader>
        </Col>
        {!idHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              textButton="Tìm kiếm"
              placeholder="input search text"

              onChange={onSearch}
            />
          </Col>
        )}
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <WrapperHeaderAccount>
            {userAvatar ? (
              <img
                src={userAvatar}
                alt="avatar"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined style={{ fontSize: "30px" }} />
            )}
            {user?.access_token ? (
              <>
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <div style={{ cursor: "pointer" }} onClick={()=> setIsOpenPopup((prev)=> !prev)}>
                    {userName?.length ? userName : user?.email}
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/ Đăng kí
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
