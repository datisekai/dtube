import React from "react";
import InfiniteVideos from "../components/InfiniteVideos";

const PlayList = () => {
  const api = "/video/videos/playlist";

  return <InfiniteVideos api={api} isUser={true} />;
};

export default PlayList;
