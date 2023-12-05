import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SiderLayout from "../../layouts/User/SiderLayout/SiderLayout";
import HeaderLayout from "../../layouts/User/HeaderLayout/HeaderLayout";
import ControlsLayout from "../../layouts/User/ControlsLayout/ControlsLayout";

const { Content } = Layout;

const UserTemplate = () => {
  return (
    <Layout hasSider>
      <SiderLayout />
      <Layout className="site-layout">
        <HeaderLayout />
        <Content
          style={{
            overflow: "initial",
            marginLeft: 200,
            marginTop: 80,
            backgroundColor: "#ccc",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: "linear-gradient(to bottom, #1e1e1e, #292929)",
              minHeight: "100vh",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <ControlsLayout />
      </Layout>
    </Layout>
  );
};

export default UserTemplate;
