import React, { useState } from "react";
import { Layout } from "antd";
import { Col, Row } from "antd";
import css from "./headerLayout.module.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getSearchValuesActionApi } from "../../../redux/reducers/searchReducer";
import { customNavigate } from "../../../App";

const { Search } = Input;

const { Header } = Layout;

const HeaderLayout = () => {
  const onSearch = (value) => {
    if (value.trim()) {
      customNavigate.push(`/tim-kiem/tat-ca?q=${value.trim()}`);
    }
  };
  return (
    <Header className={`${css["custom-header"]}`}>
      <div className="container-fluid">
        <Row>
          <Col className={`${css["custom-height"]}`} span={10}>
            <div
              className={`d-flex justify-content-between align-items-center ${css["custom-height"]}`}
            >
              <div className="d-flex">
                <ArrowLeftOutlined className={`${css["custom-icon"]}`} />
                <ArrowRightOutlined className={`${css["custom-icon"]}`} />
              </div>
              <div>
                <Search
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
                  bordered
                  allowClear
                  status="warning"
                  onSearch={onSearch}
                  size="large"
                  style={{
                    width: 500,
                    verticalAlign: "middle",
                  }}
                />
              </div>
            </div>
          </Col>
          <Col className={`${css["custom-col"]}`} span={14}>
            <div
              style={{ height: "100%" }}
              className="d-flex justify-content-end align-items-center"
            >
              <SettingOutlined
                style={{ fontSize: 20 }}
                className={`${css["custom-icon"]}`}
              />
              <div className={`${css["avatar"]}`}>
                <img
                  src="/images/default_avatar.jpg"
                  alt="avatar"
                  className={`${css["avatar-image"]}`}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default HeaderLayout;
