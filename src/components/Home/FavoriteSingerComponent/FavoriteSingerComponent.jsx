import React, { memo } from "react";
import css from "./favoriteSingerComponent.module.css";
import { useSelector } from "react-redux";
import { customNavigate } from "../../../App";

const FavoriteSingerComponent = () => {

  const { playLists } = useSelector((state) => state.homeReducer);

  const handleClickItemFavoriteSinger = (item) => {
    const albumPath = item?.link?.split(".")[0];
    customNavigate.push(albumPath);
  };

  const renderItemFavoriteSinger = (index) => {
    const firstFiveItems = playLists[index]?.items?.slice(0, 5);
    if (!firstFiveItems) {
      return null;
    }

    return firstFiveItems.map((item, index) => {
      return (
        <div key={index} className={`${css["custom-favoriteSinger-card-container"]}`}>
          <div className={`${css["custom-favoriteSinger-card"]}`}>
          <img
            className={`${css["custom-favoriteSinger-card-img"]}`}
            src={item.thumbnailM}
            alt=""
            onClick={() => handleClickItemFavoriteSinger(item)}
          />
          </div>
          {/* <span className={`${css["custom-favoriteSinger-card-song"]}`}>
            {item.title}
          </span> */}
          <span className={`${css["custom-favoriteSinger-card-desc"]}`}>
            {item.sortDescription}
          </span>
        </div>
      );
    });
  };

  const renderFavoriteSinger = (index) => {
    return (
      <div className={`${css["custom-favoriteSinger-container"]}`}>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`${css["custom-favoriteSinger-title"]}`}>
            {playLists[index]?.title}
          </span>
          <div className={`${css["custom-favoriteSinger-seeall"]}`}>
            <span className={`${css["custom-favoriteSinger-text"]}`}>TẤT CẢ</span>
            <i
              className={`${css["custom-favoriteSinger-icon"]} fa-solid fa-angle-right`}
            ></i>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {renderItemFavoriteSinger(index)}
        </div>
      </div>
    );
  };

  return <>
    {renderFavoriteSinger(7)}
  </>;
};

export default memo(FavoriteSingerComponent);
