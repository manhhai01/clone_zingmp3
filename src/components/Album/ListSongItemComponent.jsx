import React, { memo } from "react";
import SongItem from "./SongItemComponent";

const ListSongItemComponent = ({ songs, totalDuration }) => {

  const renderListSongItemComponent = () => {
    return songs?.map((item, index) => {
      return <SongItem key={index} songData={item}/>;
    });
  };

  return (
    <div style={{maxHeight: 1000, overflowY: "auto", width: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"}}>
      <table
        style={{
          backgroundColor: "#ccc",
        }}
        className="table table-dark table-hover"
      >
        <thead>
          <tr>
            <th style={{ width: "45%" }} scope="col">
              <span
                style={{
                  float: "left",
                  padding: 10,
                  color: "#ccc",
                  fontWeight: 400,
                  fontSize: 14,
                }}
              >
                <i
                  style={{ marginRight: 10 }}
                  className="fa-solid fa-clipboard-list"
                ></i>
                Bài hát
              </span>
            </th>
            <th style={{ width: "45%" }} scope="col">
              <span
                style={{
                  float: "left",
                  padding: 10,
                  color: "#ccc",
                  fontWeight: 400,
                  fontSize: 14,
                }}
              >
                Album
              </span>
            </th>
            <th style={{ width: "10%" }} scope="col">
              <span
                style={{
                  padding: 10,
                  color: "#ccc",
                  fontWeight: 400,
                  fontSize: 14,
                }}
              >
                Thời gian
              </span>
            </th>
          </tr>
        </thead>
        <tbody>{renderListSongItemComponent()}</tbody>
      </table>
    </div>
  );
};

export default memo(ListSongItemComponent);
