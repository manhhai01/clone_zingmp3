import React, { memo, useEffect, useRef, useState } from "react";
import css from "./chartComponent.module.css";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, toLength } from "lodash";
import { Link } from "react-router-dom";
import { setSongCurrentAction } from "../../../redux/reducers/featureReducer";
import {
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
  setIsPlayingAction,
} from "../../../redux/reducers/statusReducer";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  const { playLists } = useSelector((state) => state.homeReducer);

  const dispatch = useDispatch();

  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  const chartRef = useRef();

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { borderDash: [1, 4], color: "gray" },
        min: playLists[9]?.chart?.minScore,
        max: playLists[9]?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: (context) => {
          // if (!chartRef || !chartRef.current) return;
          // const tooltipModel = context.tooltip;
          // if (tooltipModel.opacity === 0) {
          //   if (tooltipState.opacity !== 0)
          //     setTooltipState((prev) => ({ ...prev, opacity: 0 }));
          //   return;
          // }
          // const newTooltipData = {
          //   opacity: 1,
          //   top: tooltipModel.caretX,
          //   left: tooltipModel.caretY,
          // };
          // if (!isEqual(newTooltipData, tooltipState))
          //   setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = playLists[9]?.chart?.times
      ?.filter((item) => item.hour % 2 == 0)
      .map((item) => `${item.hour}:00`);
    const datasets = [];
    if (playLists[9]?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: playLists[9]?.chart?.items[
            Object.keys(playLists[9]?.chart?.items)[i]
          ]
            ?.filter((item) => item.hour % 2 == 0)
            .map((item) => item.counter),
          borderColor:
            i === 0
              ? "rgb(74, 144, 226)"
              : i === 1
              ? "rgb(39, 189, 156)"
              : "rgb(227, 80, 80)",
          tension: 0.3,
          borderWidth: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: "white",
          pointHitRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          animation: false,
          pointHoverBorderWidth: 5,
        });
      }
      setData({ labels, datasets });
    }
  }, [playLists]);

  const handleClickSongItem = (item) => {
    dispatch(setSongCurrentAction(item));
    dispatch(setIsPlayingAction(true));
    dispatch(setIsAlbumNextAction(false));
    dispatch(setIsAlbumPrevAction(false));
  };

  const renderSongItems = () => {
    return playLists[9]?.items
      ?.filter((i, index) => index < 3)
      .map((item, index) => {
        return (
          <div
            key={index}
            className={`${css["custom-songItem-container"]}`}
            onClick={() => handleClickSongItem(item)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-start align-items-center">
                <span
                  style={{ fontSize: 30 }}
                  className={`${
                    index === 0
                      ? `${css["custom-text-shadow-no1"]}`
                      : `${
                          index === 1
                            ? `${css["custom-text-shadow-no2"]}`
                            : `${css["custom-text-shadow-no3"]}`
                        }`
                  }`}
                >
                  {index + 1}
                </span>
                <div className={`${css["custom-songItem-image-container"]}`}>
                  <img className="w-100 h-100" src={item?.thumbnail} alt="" />
                </div>
                <div
                  style={{ marginLeft: 10 }}
                  className="d-flex flex-column justify-content-between align-items-start"
                >
                  <span style={{ fontSize: 14 }}>{item?.title}</span>
                  <span style={{ color: "#ccc", fontSize: 12 }}>
                    {item?.artistsNames}
                  </span>
                </div>
              </div>
              <div style={{ marginLeft: 10 }}>
                <span>{`${Math.round(
                  ((item?.score || 0) /
                    (playLists[9]?.chart?.totalScore || 1)) *
                    100
                )}%`}</span>
              </div>
            </div>
          </div>
        );
      });
  };

  // const renderTooltip = () => {
  //   return (
  //     <div
  //       className="text-white"
  //       style={{
  //         top: tooltipState.top,
  //         left: tooltipState.left,
  //         opacity: tooltipState.opacity,
  //       }}
  //     >
  //       tooltip
  //     </div>
  //   );
  // };

  return (
    <div className={`${css["custom-chart-container"]} text-white`}>
      <div className="d-flex justify-content-start align-items-center">
        <Link
          style={{ textDecoration: "none", color: "orange" }}
          to={"/zing-chart"}
        >
          <div
            style={{ cursor: "pointer" }}
            className={`${css["custom-chart-title"]}`}
          >
            #zingchart
          </div>
        </Link>
        <i
          style={{ marginLeft: 10, fontSize: 20, color: "#ccc" }}
          className="fa-regular fa-circle-play"
        ></i>
      </div>
      <div className="row g-0">
        <div className="col-4 d-flex flex-column justify-content-between">
          <div className="mt-4">{renderSongItems()}</div>
          <Link
            style={{ textDecoration: "none", color: "orange" }}
            to={"/zing-chart"}
          >
            <div className="d-flex justify-content-center align-items-center p-4">
              <span
                style={{ cursor: "pointer" }}
                className="border border-white p-1 w-25 rounded-4"
              >
                Xem thêm
              </span>
            </div>
          </Link>
        </div>
        <div className="col-8">
          {data && <Line data={data} options={options} ref={chartRef} />}
        </div>
      </div>
    </div>
  );
};

export default memo(ChartComponent);
