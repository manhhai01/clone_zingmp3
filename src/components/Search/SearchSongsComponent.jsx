import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchSongsActionApi } from "../../redux/reducers/searchReducer";
import SongItemComponent from "../Album/SongItemComponent";
import { getPlayListActionApi } from "../../redux/reducers/playListReducer";

const SearchSongsComponent = () => {
  const dispatch = useDispatch();

  const { searchValues } = useSelector(
    (state) => state.searchReducer
  );

  const { song } = useSelector((state) => state.playListReducer.playList);

  useEffect(() => {
    getSearchSongsFunction();
  }, []);

  const getSearchSongsFunction = async () => {
    const actionAsync = getPlayListActionApi(
      searchValues?.playlists[0]?.encodeId
    );
    dispatch(actionAsync);
  };

  const renderListSongItemComponent = () => {
    return song?.items?.map((item, index) => {
      return <SongItemComponent key={index} songData={item} />;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        marginTop: 50,
      }}
    >
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

export default memo(SearchSongsComponent);
