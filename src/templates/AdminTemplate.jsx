import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { pathDefault } from "../common/path";
import useCheckPermission from "../hooks/useCheckPermission";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const location = useLocation();

  const hasPermission = useCheckPermission();

  if (!hasPermission) return null;

  return (
    <Layout className="h-svh">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: pathDefault.admin,
              label: <NavLink to={pathDefault.admin}>Admin</NavLink>,
            },
            {
              key: pathDefault.managerUser,
              label: <NavLink to={pathDefault.managerUser}>Người dùng</NavLink>,
            },
            {
              key: pathDefault.managerProduct,
              label: (
                <NavLink to={pathDefault.managerProduct}>Sản phẩm</NavLink>
              ),
              children: [
                {
                  key: pathDefault.managerPostProduct,
                  label: (
                    <NavLink to={pathDefault.managerPostProduct}>
                      Thêm sản phẩm
                    </NavLink>
                  ),
                },
              ],
            },
            {
              key: "/product-types",
              label: <NavLink to="/product-types">Kiểu sản phẩm</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: token.colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
