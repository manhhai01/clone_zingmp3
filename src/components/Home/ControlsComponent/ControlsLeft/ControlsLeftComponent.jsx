import React, { memo, useEffect } from "react";
import css from "./ControsLeftComponent.module.css";
import { HeartOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getSongCurrentDetailActionApi } from "../../../../redux/reducers/songsReducer";

const ControlsLeftComponent = () => {
  const { songCurrent } = useSelector((state) => state.featureReducer);

  const { songCurrentDetail } = useSelector((state) => state.songsReducer);

  const dispatch = useDispatch();

  const songCurrentId = songCurrent.encodeId;

  useEffect(() => {
    getSongCurrentDetailFunction();
  }, [songCurrentId]);

  const getSongCurrentDetailFunction = async () => {
    const actionAsync = getSongCurrentDetailActionApi(songCurrentId);
    dispatch(actionAsync);
  };

  return (
    <div
      className={`${css["custom-min-height"]} d-flex justify-content-start align-items-center`}
    >
      <div className={`${css["custom-image"]}`}>
        <img
          src={songCurrentDetail?.thumbnail}
          alt={songCurrentDetail?.alias}
        />
      </div>
      <div className={`${css["custom-info-song"]}`}>
        <div className={`${css["custom-name-song"]}`}>
          <span>{songCurrentDetail?.title}</span>
        </div>
        <div className={`${css["custom-name-singers"]}`}>
          <span>{songCurrentDetail?.artistsNames}</span>
        </div>
      </div>
      <HeartOutlined className={`${css["custom-icon-left"]}`} />
      <EllipsisOutlined className={`${css["custom-icon-left"]}`} />
    </div>
  );
};

export default memo(ControlsLeftComponent);
