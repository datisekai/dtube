import React from "react";
import InfiniteVideos from "../components/InfiniteVideos";

const Popular = () => {
  const api = "/video/videos/popular";

  return <InfiniteVideos api={api} />;
};

export default Popular;
