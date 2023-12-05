import React, { useEffect } from "react";

const ZingChartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="text-white">ZingChartPage</div>;
};

export default ZingChartPage;
