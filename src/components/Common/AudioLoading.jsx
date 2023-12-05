import React, { memo } from "react";
import { Bars } from "react-loader-spinner";

const AudioLoading = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="rgba(255, 255, 255, 0.4)"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default memo(AudioLoading);
