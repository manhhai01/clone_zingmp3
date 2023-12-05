import React, { memo } from "react";
import css from "./searchAllComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import { setSongCurrentAction } from "../../redux/reducers/featureReducer";
import {
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
  setIsPlayingAction,
} from "../../redux/reducers/statusReducer";
import { customNavigate } from "../../App";
import { Link } from "react-router-dom";

const SearchAllComponent = () => {
  const { searchValues } = useSelector((state) => state.searchReducer);

  const dispatch = useDispatch();

  const handleClickItemTopSearch = () => {
    const item = searchValues?.top;
    if (item?.objectType === "artist") {
      customNavigate.push(searchValues?.top?.link);
    } else if (item?.objectType === "playlist") {
      const albumPath = item?.link?.split(".")[0];
      customNavigate.push(albumPath);
    } else {
      dispatch(setSongCurrentAction(item));
      dispatch(setIsPlayingAction(true));
      dispatch(setIsAlbumNextAction(false));
      dispatch(setIsAlbumPrevAction(false));
    }
  };

  const handleClickSearchSong = (item) => {
    dispatch(setSongCurrentAction(item));
    dispatch(setIsPlayingAction(true));
    dispatch(setIsAlbumNextAction(false));
    dispatch(setIsAlbumPrevAction(false));
  };

  const handleClickItemPlaylistSearch = (item) => {
    const albumPath = item?.link?.split(".")[0];
    customNavigate.push(albumPath);
  };

  const renderObjectType = () => {
    if (searchValues?.top?.objectType === "artist") {
      return "Nghệ sĩ";
    } else if (searchValues?.top?.objectType === "playlist") {
      return "Playlist";
    } else {
      return "Bài hát";
    }
  };

  const renderSearchTopSongs = () => {
    const items = searchValues?.songs?.slice(0, 2);

    return items?.map((item, index) => {
      return (
        <div key={index} className="col-4">
          <div
            style={{
              backgroundColor: "rgba(204, 204, 204, 0.1)",
              padding: "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={() => handleClickSearchSong(item)}
          >
            <div className="d-flex justify-content-start align-items-center w-100">
              <div style={{ width: 80, height: 80 }}>
                <img
                  style={{ width: "100%", height: "100%", borderRadius: 6 }}
                  src={item?.thumbnail}
                  alt=""
                />
              </div>
              <div
                style={{ marginLeft: 20, color: "rgba(204, 204, 204, 0.8)" }}
                className="d-flex flex-column align-items-start"
              >
                <span style={{ fontSize: 12 }}>Bài hát</span>
                <span style={{ fontSize: 14, color: "whitesmoke" }}>
                  {item?.title}
                </span>
                <span style={{ fontSize: 12 }}>{item?.artistsNames}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderSongItemSearch = () => {
    return searchValues?.songs?.map((item, index) => {
      return (
        <div
          key={index}
          className={`${css["custom-container-item"]} d-flex justify-content-start align-items-center`}
          style={{ padding: "20px 0px" }}
          onClick={() => handleClickSearchSong(item)}
        >
          <div className={`${css["custom-container-img"]}`}>
            <img
              className={`${css["custom-img"]}`}
              src={item?.thumbnail}
              alt=""
            />
          </div>
          <div
            className={`${css["custom-container-info"]} d-flex flex-column align-items-start justify-content-center`}
            style={{ marginLeft: 20, color: "rgba(204, 204, 204, 0.8)" }}
          >
            <span style={{ fontSize: 12 }}>Bài hát</span>
            <span style={{ fontSize: 14, color: "whitesmoke" }}>
              {item?.title}
            </span>
            <span style={{ fontSize: 12 }}>{item?.artistsNames}</span>
          </div>
        </div>
      );
    });
  };

  const renderItemPlayListSearch = () => {
    const firstFiveItems = searchValues?.playlists?.slice(0, 5);
    if (!firstFiveItems) {
      return null;
    }
    return firstFiveItems?.map((item, index) => {
      return (
        <div
          key={index}
          className={`${css["custom-playlist-card-container"]}`}
          onClick={() => handleClickItemPlaylistSearch(item)}
        >
          <div className={`${css["custom-playlist-card"]}`}>
            <img
              className={`${css["custom-playlist-card-img"]}`}
              src={item?.thumbnail}
              alt=""
            />
          </div>
          <span
            style={{ color: "whitesmoke" }}
            className={`${css["custom-playlist-card-song"]}`}
          >
            {item?.title}
          </span>
          <span className={`${css["custom-playlist-card-desc"]}`}>
            {item?.artistsNames}
          </span>
        </div>
      );
    });
  };

  const renderArtistItem = () => {
    return searchValues?.artists?.map((item, index) => {
      return (
        <div
          key={index}
          style={{ margin: "20px 50px" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div style={{ width: 175, height: 175 }}>
            <Link to={item?.link}>
              <img
                style={{
                  borderRadius: "50%",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                  cursor: "pointer",
                }}
                className={`${css["custom-artist-item-img"]} w-100 h-100`}
                src={item?.thumbnail}
                alt=""
              />
            </Link>
          </div>
          <div
            style={{ color: "rgba(204, 204, 204, 0.8)" }}
            className="d-flex flex-column mt-3"
          >
            <span style={{ color: "whitesmoke", fontSize: 16 }}>
              {item?.name}
            </span>
            <span style={{ fontSize: 13 }}>{`${formatNumber(
              item?.totalFollow
            )} quan tâm`}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-start">
      <h5 style={{ color: "whitesmoke", marginTop: 50, marginBottom: 20 }}>
        Nổi bật
      </h5>
      <div style={{ width: "100%" }} className="row g-5">
        <div className="col-4">
          <div
            style={{
              backgroundColor: "rgba(204, 204, 204, 0.1)",
              padding: "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={handleClickItemTopSearch}
          >
            <div className="d-flex justify-content-start align-items-center w-100">
              <div style={{ width: 80, height: 80 }}>
                <img
                  style={{ width: "100%", height: "100%", borderRadius: 6 }}
                  src={searchValues?.top?.thumbnail}
                  alt=""
                  className={`${
                    searchValues?.top?.objectType === "artist"
                      ? "rounded-circle"
                      : ""
                  }`}
                />
              </div>
              <div
                style={{ marginLeft: 20, color: "rgba(204, 204, 204, 0.8)" }}
                className="d-flex flex-column align-items-start"
              >
                <span style={{ fontSize: 12 }}>{renderObjectType()}</span>
                <span style={{ fontSize: 14, color: "whitesmoke" }}>
                  {searchValues?.top?.title || searchValues?.top?.name}
                </span>
                <span style={{ fontSize: 12 }}>{`${
                  searchValues?.top?.objectType === "artist"
                    ? `${
                        formatNumber(searchValues?.artists[0]?.totalFollow) +
                        " quan tâm"
                      }`
                    : `${searchValues?.top?.artistsNames}`
                }`}</span>
              </div>
            </div>
          </div>
        </div>
        {renderSearchTopSongs()}
      </div>
      <h5 style={{ color: "whitesmoke", marginTop: 50, marginBottom: 20 }}>
        Bài hát
      </h5>
      <div className="d-flex flex-wrap w-100 g-2 text-white justify-content-start">
        {renderSongItemSearch()}
      </div>

      <h5 style={{ color: "whitesmoke", marginTop: 50, marginBottom: 20 }}>
        Playlist/Album
      </h5>
      <div
        style={{ width: "100%" }}
        className="d-flex justify-content-between align-items-center"
      >
        {renderItemPlayListSearch()}
      </div>

      <h5 style={{ color: "whitesmoke", marginTop: 50, marginBottom: 20 }}>
        Nghệ sĩ
      </h5>

      <div className="d-flex justify-content-start align-items-center flex-wrap">
        {renderArtistItem()}
      </div>
    </div>
  );
};

export default memo(SearchAllComponent);
