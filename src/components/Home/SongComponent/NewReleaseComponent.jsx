import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "./NewReleaseComponent.module.css";
import SongItemComponent from "./SongItemComponent";

const NewReleaseComponent = () => {
  const { playLists } = useSelector((state) => state.homeReducer);

  const [isActive, setIsActive] = useState("all");

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (isActive === "all") {
      setSongs(playLists[2]?.items?.all);
    } else if (isActive === "vPop") {
      setSongs(playLists[2]?.items?.vPop);
    } else {
      setSongs(playLists[2]?.items?.others);
    }
  }, [isActive, playLists]);

  const handleSetIsActiveAll = () => {
    setIsActive("all");
  };

  const handleSetIsActiveVpop = () => {
    setIsActive("vPop");
  };

  const handleSetIsActiveOthers = () => {
    setIsActive("others");
  };

  const renderSongItems = () => {
    const items = songs?.slice(0, 12);
    if (!items) {
      return null;
    }
    return items.map((item, index) => {
      return <SongItemComponent key={index} item={item} />;
    });
  };

  return (
    <div className={`${css["custom-newrelease-container"]}`}>
      <div className="d-flex justify-content-start align-items-center">
        <span className={`${css["custom-newrelease-title"]}`}>
          {playLists[2]?.title}
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex justify-content-start align-items-center mt-4">
          <button
            type="button"
            className={`${css["custom-newrelease-button"]} ${
              isActive === "all" ? `${css["custom-button-active"]}` : ""
            }`}
            onClick={handleSetIsActiveAll}
          >
            TẤT CẢ
          </button>
          <button
            type="button"
            className={`${css["custom-newrelease-button"]} ${
              isActive === "vPop" ? `${css["custom-button-active"]}` : ""
            }`}
            onClick={handleSetIsActiveVpop}
          >
            VIỆT NAM
          </button>
          <button
            type="button"
            className={`${css["custom-newrelease-button"]} ${
              isActive === "others" ? `${css["custom-button-active"]}` : ""
            }`}
            onClick={handleSetIsActiveOthers}
          >
            QUỐC TẾ
          </button>
        </div>
        <div className={`${css["custom-newrelease-seeall"]}`}>
          <span className={`${css["custom-newrelease-text"]}`}>TẤT CẢ</span>
          <i
            className={`${css["custom-newrelease-icon"]} fa-solid fa-angle-right`}
          ></i>
        </div>
      </div>

      <div className="d-flex flex-wrap w-100 g-2 text-white justify-content-between mt-4">
        {renderSongItems()}
      </div>
    </div>
  );
};

export default memo(NewReleaseComponent);
