import React from "react";
import { useSelector } from "react-redux";
import InfiniteVideos from "../components/InfiniteVideos";

const MyVideo = () => {

  const { user } = useSelector((state) => state.user);

  const api = user && `/video/${user._id}`

  

  return (
   <InfiniteVideos api={api} isUser={true}/>
  );
};

export default MyVideo;
