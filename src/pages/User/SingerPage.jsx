import React, { useEffect } from "react";

const SingerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="text-white">SingerPage</div>;
};

export default SingerPage;
