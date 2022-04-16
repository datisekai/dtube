import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideo } from "../redux/videoReducer";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

const InfiniteVideos = ({ api,isUser }) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const lịmit = 8;

  const handleSetValue = (values) => {
    setValue(values);
  };

  const handleSetPage = () => {
    if (videos.length >= lịmit) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
   if(isUser)
   {
    if (user) {
        getVideo();
      }
   }else{
       getVideo()
   }
  }, []);

  const getVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}?page=${page}`);
      if (res) {
        dispatch(setVideo(res.data.videos));
        setVideos(res.data.videos);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between min-h-screen">
      <Sidebar />
      <div className="hidden lg:block w-[17%]"></div>
      <Videos
        onClickSetValue={handleSetValue}
        onNextPage={handleSetPage}
        value={value}
        load={loading}
      />
    </div>
  );
};

export default InfiniteVideos;
