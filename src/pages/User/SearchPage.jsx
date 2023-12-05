import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getSearchValuesActionApi } from "../../redux/reducers/searchReducer";
import css from "./searchPage.module.css";

const SearchPage = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("q");

  useEffect(() => {
    getSearchApiFuntion();
    window.scrollTo(0, 0);
  }, [keyword]);

  const searchMenu = [
    {
      path: "tat-ca",
      text: "TẤT CẢ",
    },
    {
      path: "bai-hat",
      text: "BÀI HÁT",
    },
    {
      path: "playlist",
      text: "PLAYLIST/ALBUM",
    },
  ];

  const renderSearchMenu = () => {
    return searchMenu?.map((item, index) => {
      return (
        <NavLink
          key={index}
          style={{ textDecoration: "none" }}
          to={`${item?.path}?q=${keyword}`}
          className={({ isActive }) =>
            isActive ? `${css["custom-menu-active"]}` : `${css["custom-menu"]}`
          }
        >
          <div style={{ marginRight: 10, padding: 10 }}>{item?.text}</div>
        </NavLink>
      );
    });
  };

  const getSearchApiFuntion = async () => {
    const actionAsync = getSearchValuesActionApi(keyword);
    dispatch(actionAsync);
  };

  return (
    <div style={{ paddingBottom: 300 }}>
      <div className="d-flex justify-content-start align-items-center">
        <h5 style={{ marginRight: 30, marginBottom: 0, color: "#ccc" }}>
          Kết Quả Tìm Kiếm
        </h5>
        <div className="d-flex justify-content-center align-items-center">
          {renderSearchMenu()}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchPage;
