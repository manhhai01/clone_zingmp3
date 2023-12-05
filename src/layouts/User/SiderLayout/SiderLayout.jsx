import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  RiseOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  UserOutlined,
  ProfileOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import css from "./siderLayout.module.css";
import { customNavigate } from "../../../App";
import { useDispatch } from "react-redux";

const { Sider } = Layout;

const labels = [
  "Cá nhân",
  "Thịnh hành",
  "Khám phá",
  "Nghe gần đây",
  "Bài hát yêu thích",
  "Ca sĩ yêu thích",
  "Danh sách phát",
  "Thêm playlist",
];

const items = [
  HomeOutlined,
  RiseOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  UserOutlined,
  ProfileOutlined,
  PlusCircleOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: labels[index],
  style: { marginTop: index % 3 === 0 ? "30px" : "0" },
}));

// Hàm tùy chỉnh để bỏ dấu trong từ đi
const removeAccents = (str) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  str = str.toLowerCase().replace(/\s/g, "-");
  return str;
};

const SiderLayout = () => {
  const [selectedKey, setSelectedKey] = useState("3");

  useEffect(() => {
    setSelectedKey("3");
    customNavigate.push("/");
  }, []);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "black",
      }}
      className={`${css["custom-menu-border"]}`}
    >
      <div className="demo-logo-vertical" />
      <div
        style={{ height: 100, margin: "0px 20px" }}
        onClick={() => {
          customNavigate.push("/");
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src="/images/logo_zingmp3.png"
          alt="logo zingmp3"
        />
      </div>
      <Menu theme="dark" mode="inline" style={{ backgroundColor: "black" }}>
        {items.map((item, index) => (
          <Menu.Item
            className={
              item.key === selectedKey
                ? `${css["custom-menu-item-selected"]}`
                : ""
            }
            key={item.key}
            style={item.style}
            onClick={handleMenuClick}
          >
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/${removeAccents(item.label)}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderLayout;
