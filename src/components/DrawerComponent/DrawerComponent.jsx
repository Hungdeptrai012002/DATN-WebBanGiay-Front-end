import React from 'react';
import { Drawer } from 'antd';

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      open={isOpen} // Thay `open` thành `visible` theo tên prop của Ant Design
      {...rests}
    >
      {children}
    </Drawer>
  );
};

export default DrawerComponent;