import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteVideos from "../components/InfiniteVideos";
import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";
import { setVideo } from "../redux/videoReducer";

const Subscription = () => {
  const api = "/video/videos/subcription";

  return <InfiniteVideos api={api} isUser={true} />;
};

export default Subscription;
