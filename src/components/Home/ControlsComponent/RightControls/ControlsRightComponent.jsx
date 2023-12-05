import React, { memo, startTransition, useState } from "react";
import css from "./controlsRightComponent.module.css";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsVolumeAction,
  setValueVolumeAction,
} from "../../../../redux/reducers/statusReducer";

const ControlsRightComponent = () => {
  const { isVolume, valueVolume } = useSelector((state) => state.statusReducer);

  const dispatch = useDispatch();

  const onChange = (value) => {
    dispatch(setValueVolumeAction(value));
  };

  const handleToggleVolume = () => {
    dispatch(setIsVolumeAction(!isVolume));
  };

  return (
    <div
      style={{ minHeight: 120 }}
      className="text-white d-flex justify-content-center align-items-center"
    >
      {isVolume ? (
        valueVolume >= 50 ? (
          <i
            style={{ fontSize: 16, cursor: "pointer" }}
            className="fa-solid fa-volume-high"
            onClick={handleToggleVolume}
          ></i>
        ) : valueVolume > 0 ? (
          <i
            style={{ fontSize: 16, cursor: "pointer" }}
            className="fa-solid fa-volume-low"
            onClick={handleToggleVolume}
          ></i>
        ) : (
          <i
            style={{ fontSize: 16, cursor: "pointer" }}
            className="fa-solid fa-volume-off"
            onClick={handleToggleVolume}
          ></i>
        )
      ) : (
        <i
          style={{ fontSize: 16, cursor: "pointer" }}
          className="fa-solid fa-volume-xmark"
          onClick={handleToggleVolume}
        ></i>
      )}
      <Slider
        style={{ width: "30%", marginLeft: 20 }}
        value={isVolume ? valueVolume : 0}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(ControlsRightComponent);
