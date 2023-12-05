import React from "react";
import css from "./controlsLayout.module.css";
import { useSelector } from "react-redux";
import ControlsLeftComponent from "../../../components/Home/ControlsComponent/ControlsLeft/ControlsLeftComponent";
import ControlsCenterComponent from "../../../components/Home/ControlsComponent/ControlsCenter/ControlsCenterComponent";
import ControlsRightComponent from "../../../components/Home/ControlsComponent/RightControls/ControlsRightComponent";

const ControlsLayout = () => {
  const { songCurrent } = useSelector((state) => state.featureReducer);

  return (
    <div className={`${css["custom-controls-layout"]} ${Object.keys(songCurrent).length === 0 ? "d-none" : ""}`}>
      <div className={`${css["custom-min-height"]} container-fluid`}>
        <div className={`${css["custom-min-height"]} row`}>
          <div className="col-3">
            <ControlsLeftComponent />
          </div>
          <div className="col-6">
            <ControlsCenterComponent />
          </div>
          <div className="col-3">
            <ControlsRightComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsLayout;
