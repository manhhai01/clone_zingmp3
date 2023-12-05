import React, { memo } from "react";
import css from "./SongItemComponent.module.css";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { setSongCurrentAction } from "../../../redux/reducers/featureReducer";
import {
  setIsPlayingAction,
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
} from "../../../redux/reducers/statusReducer";

const SongItemComponent = (item) => {
  const dispatch = useDispatch();

  const handleClickSongItem = () => {
    dispatch(setSongCurrentAction(item?.item));
    dispatch(setIsPlayingAction(true));
    dispatch(setIsAlbumNextAction(false));
    dispatch(setIsAlbumPrevAction(false));
  };

  return (
    <div
      className={`${css["custom-container-item"]} d-flex justify-content-start align-items-center`}
      onClick={handleClickSongItem}
    >
      <div className={`${css["custom-container-img"]}`}>
        <img
          className={`${css["custom-img"]}`}
          src={item?.item?.thumbnail}
          alt=""
        />
      </div>
      <div
        className={`${css["custom-container-info"]} d-flex flex-column align-items-start justify-content-between`}
      >
        <span style={{ fontSize: 14, color: "white" }}>
          {item?.item?.title}
        </span>
        <span style={{ fontSize: 12, color: "rgba(204, 204, 204, 0.8)" }}>
          {item?.item?.artistsNames}
        </span>
        <span style={{ fontSize: 12, color: "rgba(204, 204, 204, 0.8)" }}>
          {moment(item?.item?.releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItemComponent);
