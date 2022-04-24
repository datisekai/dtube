import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";
import useQuery from "../hooks/useQuery";
import { useDispatch } from "react-redux";
import { setVideo } from "../redux/videoReducer";
import Loading from "../utils/Loading";
import { scrollTop } from "../utils/scrollTop";

const Home = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const url = `/video/videos/type/${value}?page=${page}`;
  const { data, error, loading } = useQuery(url);
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.video);
  const limit = 8;

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setVideo([...videos, ...data?.videos]));
    }
  }, [data]);

  useEffect(() => {
    dispatch(setVideo([]));
    setPage(1);
  }, [value]);

  const handleSetValue = (values) => {
    setValue(values);
  };

  const handleSetPage = () => {
    videos?.length === limit && setPage(page + 1);
  };

  return (
    <div className='flex justify-between min-h-screen'>
      <Sidebar />
      <div className='hidden lg:block w-[17%]'></div>
      <Videos
        onClickSetValue={handleSetValue}
        onNextPage={handleSetPage}
        value={value}
        loading={loading}
      />
    </div>
  );
};

export default Home;
