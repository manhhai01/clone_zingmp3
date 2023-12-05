import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBannersActionApi, getPlayListsActionApi } from "../../redux/reducers/homeReducer";
import SliderComponent from "../../components/Home/SliderComponent/SliderComponent";
import PlayListComponent from "../../components/Home/PlayListComponent/PlayListComponent";
import NewReleaseComponent from "../../components/Home/SongComponent/NewReleaseComponent";
import WeekChartComponent from "../../components/Home/WeekChart/WeekChartComponent";
import FavoriteSingerComponent from "../../components/Home/FavoriteSingerComponent/FavoriteSingerComponent";
import ChartComponent from "../../components/Home/ChartComponent/ChartComponent";

const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getBannersApiFuntion();
    getPlaylistsApiFunction();
  }, []);

  const getBannersApiFuntion = async () => {
    const actionAsync = getBannersActionApi();
    dispatch(actionAsync);
  };

  const getPlaylistsApiFunction = async () => {
    const actionAsync = getPlayListsActionApi();
    dispatch(actionAsync);
  }

  return <div style={{paddingBottom: 300}}>
    <SliderComponent />
    <NewReleaseComponent />
    <PlayListComponent />
    <ChartComponent />
    <WeekChartComponent />
    <FavoriteSingerComponent />
  </div>;
};

export default HomePage;
