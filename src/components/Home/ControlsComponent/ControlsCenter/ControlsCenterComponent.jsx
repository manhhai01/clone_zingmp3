import React, { memo, useEffect, useRef, useState } from "react";
import css from "./controlsCenterComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
  setIsPlayingAction,
  setIsRepeatAction,
  setIsSuffleAction,
} from "../../../../redux/reducers/statusReducer";
import { getSourceSongCurrentActionApi } from "../../../../redux/reducers/songsReducer";
import moment from "moment";
import { Slider } from "antd";
import { setSongCurrentAction } from "../../../../redux/reducers/featureReducer";

const ControlsCenterComponent = () => {
  const audioElement = useRef(new Audio());

  const { isPlaying, isSuffle, isRepeat, isVolume, valueVolume } = useSelector(
    (state) => state.statusReducer
  );

  const { songCurrent } = useSelector((state) => state.featureReducer);

  const { sourceSongCurrent, songCurrentDetail } = useSelector(
    (state) => state.songsReducer
  );

  const { isAlbumNext, isAlbumPrev } = useSelector(
    (state) => state.statusReducer
  );

  const { song } = useSelector((state) => state.playListReducer.playList);

  const [currentSeconds, setCurrentSeconds] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    getSourceSongCurrentFunction();
  }, [songCurrent]);

  // useEffect(() => {
  //   if (sourceSongCurrent) {
  //     audioElement.current.pause();
  //     audioElement.current.src = sourceSongCurrent;
  //     audioElement.current.load();
  //     if (isPlaying) audioElement.current.play();
  //   }
  // }, [songCurrent, sourceSongCurrent]);

  useEffect(() => {
    const audio = audioElement.current;
    const isAudioPlaying = !audio.paused;

    if (sourceSongCurrent && audio.src !== sourceSongCurrent) {
      audio.pause();
      audio.src = sourceSongCurrent;
      audio.load();
      if (isPlaying || isAudioPlaying) {
        audio.play();
      }
    }
  }, [sourceSongCurrent, isPlaying]);

  useEffect(() => {
    dispatch(setIsPlayingAction(false));
  }, []);

  useEffect(() => {
    audioElement.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioElement.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    audioElement.current.addEventListener("ended", handleCurrentSongEnded);
    return () => {
      audioElement.current.removeEventListener("ended", handleCurrentSongEnded);
    };
  });

  useEffect(() => {
    if (isVolume) {
      audioElement.current.volume = valueVolume / 100;
    } else {
      audioElement.current.volume = 0;
    }
  }, [valueVolume, isVolume]);

  const handleCurrentSongEnded = () => {
    if (isRepeat) {
      audioElement.current.currentTime = 0;
      audioElement.current.play();
    } else if (isSuffle) {
      const randomIndex = Math.floor(Math.random() * song?.items?.length);
      dispatch(setSongCurrentAction(song?.items[randomIndex]));
    } else if(isAlbumNext) {
      handleNextSong();
    } else {
      dispatch(setIsPlayingAction(false));
    }
  };

  const getSourceSongCurrentFunction = async () => {
    const actionAsync = getSourceSongCurrentActionApi(songCurrent.encodeId);
    dispatch(actionAsync);
  };

  // const handleTogglePlayMusic = () => {
  //   if (isPlaying) {
  //     audioElement.current.pause();
  //     dispatch(setIsPlayingAction(false));
  //   } else {
  //     audioElement.current.play();
  //     dispatch(setIsPlayingAction(true));
  //   }
  // };

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioElement.current.pause();
      dispatch(setIsPlayingAction(false));
    } else {
      audioElement.current
        .play()
        .then(() => {
          dispatch(setIsPlayingAction(true));
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Error playing audio:", error);
        });
    }
  };

  const handleTimeUpdate = () => {
    setCurrentSeconds(audioElement.current.currentTime);
  };

  const onChange = (value) => {
    const duration = songCurrentDetail?.duration || 0;
    const newPosition = duration * (value / 100);
    audioElement.current.currentTime = newPosition;
    setCurrentSeconds(newPosition);
  };

  const onAfterChange = (value) => {};

  const handleNextSong = () => {
    if (isAlbumNext) {
      let currentSongIndex = undefined;

      if (isAlbumNext && song && song.items && songCurrent) {
        currentSongIndex = song.items.findIndex(
          (item) => item.encodeId === songCurrent.encodeId
        );
      }

      if (currentSongIndex !== undefined) {
        dispatch(setSongCurrentAction(song?.items[currentSongIndex + 1]));
        if (currentSongIndex === song?.items?.length - 2) {
          dispatch(setIsAlbumNextAction(false));
        } else {
          dispatch(setIsAlbumNextAction(true));
          dispatch(setIsAlbumPrevAction(true));
        }
      }
    }
  };

  const handlePrevSong = () => {
    if (isAlbumPrev) {
      let currentSongIndex = undefined;
      if (isAlbumPrev && song && song.items && songCurrent) {
        currentSongIndex = song.items.findIndex(
          (item) => item.encodeId === songCurrent.encodeId
        );
      }

      if (currentSongIndex !== undefined) {
        dispatch(setSongCurrentAction(song?.items[currentSongIndex - 1]));
        if (currentSongIndex === 1) {
          dispatch(setIsAlbumPrevAction(false));
        } else {
          dispatch(setIsAlbumNextAction(true));
          dispatch(setIsAlbumPrevAction(true));
        }
      }
    }
  };

  const handleSuffle = () => {
    dispatch(setIsSuffleAction(!isSuffle));
  };

  const handleRepeat = () => {
    dispatch(setIsRepeatAction(!isRepeat));
  };

  return (
    <div className={`${css["custom-min-height"]}`}>
      <div
        className={`${css["custom-min-height-center"]} d-flex justify-content-center align-items-center`}
      >
        <i
          className={`${css["custom-icon-center"]} fa-solid fa-shuffle ${
            isSuffle ? "opacity-100" : "opacity-50"
          }`}
          onClick={handleSuffle}
        ></i>
        <i
          className={`${css["custom-icon-center"]} fa-solid fa-backward-step ${
            isAlbumPrev ? "opacity-100" : "opacity-50"
          }`}
          onClick={handlePrevSong}
        ></i>
        {isPlaying ? (
          <i
            className={`${css["custom-icon-center"]} fa-sharp fa-regular fa-circle-pause fs-2`}
            onClick={handleTogglePlayMusic}
          ></i>
        ) : (
          <i
            className={`${css["custom-icon-center"]} fa-regular fa-circle-play fs-2`}
            onClick={handleTogglePlayMusic}
          ></i>
        )}

        <i
          className={`${css["custom-icon-center"]} fa-solid fa-forward-step ${
            isAlbumNext ? "opacity-100" : "opacity-50"
          }`}
          onClick={handleNextSong}
        ></i>
        <i
          className={`${css["custom-icon-center"]} fa-solid fa-repeat ${
            isRepeat ? "opacity-100" : "opacity-50"
          }`}
          onClick={handleRepeat}
        ></i>
      </div>
      <div
        className={`${css["custom-min-height-center"]} d-flex align-items-center justify-content-center`}
      >
        <span style={{ color: "#cccc", marginRight: 20 }}>
          {moment.utc(currentSeconds * 1000).format("mm:ss")}
        </span>
        <Slider
          style={{ width: "60%" }}
          onChange={onChange}
          onAfterChange={onAfterChange}
          value={(currentSeconds / songCurrentDetail?.duration) * 100}
        />
        <span style={{ color: "#cccc", marginLeft: 20 }}>
          {moment.utc(songCurrentDetail?.duration * 1000).format("mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default memo(ControlsCenterComponent);
