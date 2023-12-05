import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import css from "./weekChartComponent.module.css"

const WeekChartComponent = () => {
  const { playLists } = useSelector((state) => state.homeReducer);

  const renderBannerWeekChart = () => {
    return playLists[10]?.items?.map((item, index) => {
      return (
        <div
          key={index}
          style={{ width: "30%", height: 120, cursor: "pointer" }}
          className={`${css["custom-weekChart-img"]}`}
        >
          <Link to={item?.link?.split(".")[0]}>
            <img
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              src={item?.cover}
              alt=""
            />
          </Link>
        </div>
      );
    });
  };

  return (
    <div
      style={{ marginTop: 50 }}
      className="d-flex justify-content-between align-items-center"
    >
      {renderBannerWeekChart()}
    </div>
  );
};

export default memo(WeekChartComponent);
