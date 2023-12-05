import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setSongCurrentAction } from "../../../redux/reducers/featureReducer";
import { customNavigate } from "../../../App";
import {
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
  setIsPlayingAction,
} from "../../../redux/reducers/statusReducer";

const SliderComponent = () => {
  const { banners } = useSelector((state) => state.homeReducer);

  const dispatch = useDispatch();

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(setSongCurrentAction(item));
      dispatch(setIsPlayingAction(true));
      dispatch(setIsAlbumNextAction(false));
      dispatch(setIsAlbumPrevAction(false));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      customNavigate.push(albumPath);
    } else {
      dispatch(setIsAlbumNextAction(false));
      dispatch(setIsAlbumPrevAction(false));
    }
  };

  const renderBanner = () => {
    return banners?.map((item, index) => {
      return (
        <div key={index}>
          <img
            className="w-100 h-100 p-3 rounded-5"
            src={item.banner}
            alt=""
            onClick={() => handleClickBanner(item)}
          />
        </div>
      );
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container-fluid">
      <Slider {...settings}>{renderBanner()}</Slider>
    </div>
  );
};

export default memo(SliderComponent);
