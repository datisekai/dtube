import React from "react";
import InfiniteVideos from "../components/InfiniteVideos";

const PlayLike = () => {
  const api = "/video/videos/playlike";

  return <InfiniteVideos api={api} isUser={true} />;
};

export default PlayLike;
