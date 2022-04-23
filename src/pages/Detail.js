import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comments from "../components/Comments";
import SameDetail from "../components/SameDetail";
import Sidebar from "../components/Sidebar";
import useQuery from "../hooks/useQuery";
import { deleteCache, saveCache } from "../redux/cacheReducer";
import { follow, getFollow, unFollow } from "../redux/followReducer";
import {
  setLike,
  setStateLike,
  addlike,
  dislike,
  setStateDisLike,
} from "../redux/likeReducer";
import { convertTime } from "../utils/base";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { setSaveVideo, saveVideo } from "../redux/saveVideoReducer";
import { getUser } from "../redux/userReducer";
import { setLocal } from "../utils/local";
import LoadingPart from "../components/LoadingPart";

const Detail = () => {
  const { id } = useParams();
  const [sameVideo, setSameVideo] = useState([]);
  const url = `video/watch/${id}`;
  const { data, loading, error } = useQuery(url);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { cache } = useSelector((state) => state.cache);
  const { followCount, isFollow } = useSelector((state) => state.follow);
  const { likeCount, isLike, isDislike } = useSelector((state) => state.like);
  const { isSaveVideo } = useSelector((state) => state.saveVideo);
  const navigate = useNavigate();

  const inputVideo = useRef(null);

  useEffect(() => {
    const handleTime = () => {
      const currentTime = Math.round(inputVideo.current.currentTime);
      const total = inputVideo.current.duration;
      if ((+currentTime / +total) * 100 > 80) {
        axios.get(`/video/view/${id}`);
        inputVideo.current.removeEventListener("timeupdate", handleTime);
      }
    };
    inputVideo.current.addEventListener("timeupdate", handleTime);
    return () => {
      inputVideo.current &&
        inputVideo.current.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(getFollow({ userId: data?.video?.userId?._id, id: user?._id }));
    }
  }, [id, data, user]);

  useEffect(() => {
    if (data) {
      dispatch(setLike(data?.video?.likes.length));
    }
  }, [id, data]);

  useEffect(() => {
    if (user && data) {
      const likes = data.video.likes;
      const isLike = likes.some((item) => item === user._id);
      dispatch(setStateLike(isLike));
      const dislikes = data.video.dislikes;
      const isDislike = dislikes.some((item) => item === user._id);
      dispatch(setStateDisLike(isDislike));
    }
  }, [user, data]);

  useEffect(() => {
    if (user) {
      const videos = user.videos;
      if (videos.includes(id)) {
        dispatch(setSaveVideo(true));
      } else {
        dispatch(setSaveVideo(false));
      }
    }
  }, [id, user]);

  useEffect(() => {
    if (data) {
      setLocal(data.video);
    }
  }, [id, data]);

  const handleFollow = () => {
    if (user) {
      dispatch(follow(data?.video?.userId?._id));
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  const handleLike = () => {
    if (user) {
      dispatch(addlike(data?.video?._id));
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  const handleDisLike = () => {
    if (user) {
      dispatch(dislike(data?.video?._id));
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  const handleSaveVideo = () => {
    if (user) {
      dispatch(saveVideo(id));
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [id]);

  useEffect(() => {
    if (data) {
      if (cache[`/video/videos/type/${data.video.type}`]) {
        setSameVideo(cache[`/video/videos/type/${data.video.type}`]);
      } else {
        getVideoSame();
      }
    }
  }, [id, data]);

  const getVideoSame = async () => {
    try {
      const res = await axios.get(`/video/videos/type/${data.video.type}`);
      setSameVideo(res.data);
      dispatch(
        saveCache({
          url: `/video/videos/type/${data.video.type}`,
          cache: res.data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFollow = () => {
    if (user) {
      dispatch(unFollow(data?.video?.userId?._id));
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  return (
    <div className='flex justify-between min-h-screen'>
      <Sidebar />
      <div className='hidden lg:block w-[17%]'></div>
      <div className='w-[100%] lg:w-[75%] xl:w-[83%]  bg-[#F9F9F9] flex flex-col lg:flex-row justify-between p-5 lg:p-8 relative'>
        {loading && <LoadingPart />}
        <div className='w-full lg:w-[65%]'>
          <video
            src={data?.video?.video}
            className='w-full aspect-video'
            controls
            ref={inputVideo}
          ></video>
          <h1 className='text-lg lg:text-xl mt-3 capitalize'>
            {data?.video?.title}
          </h1>
          <div className='flex flex-col lg:flex-row justify-between items-center border-b pb-2'>
            <div className='flex items-center mt-2 text-[#606060]'>
              <p>{data?.video?.view} lượt xem - </p>
              <p className='ml-1'>{convertTime(data?.video?.createdAt)}</p>
            </div>
            <div className='flex items-center text-sm mt-3 lg:text-md lg:mt-0'>
              <div
                onClick={handleLike}
                className='flex items-center ml-1 px-3 cursor-pointer flex-col lg:flex-row'
                title='Tôi thích video này'
              >
                {!isLike ? <ThumbUpOutlinedIcon /> : <ThumbUpAltIcon />}
                <p className='uppercase text-[#0303030] ml-2'>{likeCount}</p>
              </div>
              <div
                onClick={handleDisLike}
                className='flex items-center ml-1 px-3 cursor-pointer flex-col lg:flex-row'
                title='Tôi không thích video này'
              >
                {!isDislike ? (
                  <ThumbDownOffAltOutlinedIcon />
                ) : (
                  <ThumbDownIcon />
                )}
                <p className='uppercase text-[#0303030] ml-2'>KHÔNG THÍCH</p>
              </div>
              <div
                className='flex items-center ml-1 px-3 cursor-pointer flex-col lg:flex-row'
                title='Lưu'
                onClick={handleSaveVideo}
              >
                {!isSaveVideo ? <PlaylistAddIcon /> : <PlaylistAddCheckIcon />}
                <p className='uppercase text-[#0303030] ml-2'>LƯU</p>
              </div>
            </div>
          </div>

          <div className='mt-4 mb-2'>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <Avatar
                  onClick={() =>
                    navigate(`/channel/${data?.video?.userId?._id}`)
                  }
                  alt='Remy Sharp'
                  src={
                    data?.video?.userId?.avatar || "/static/images/avatar/1.jpg"
                  }
                  sx={{ width: 45, height: 45 }}
                />
                <div
                  className=' ml-3 cursor-pointer'
                  onClick={() =>
                    navigate(`/channel/${data?.video?.userId?._id}`)
                  }
                >
                  {" "}
                  <h3 className='capitalize font-medium text-lg'>
                    {data?.video?.userId?.name ||
                      data?.video?.userId?.email?.slice(
                        0,
                        data?.video?.userId?.email?.indexOf("@")
                      )}
                  </h3>
                  <p className='text-[#606060]'>
                    {followCount || 0} người đăng ký
                  </p>
                </div>
              </div>

              {user?._id !== data?.video?.userId?._id && (
                <Button
                  onClick={
                    isFollow ? () => handleUnFollow() : () => handleFollow()
                  }
                  variant='contained'
                  color={`${isFollow ? "inherit" : "error"}`}
                >
                  {isFollow ? "Hủy đăng ký" : "Đăng ký"}
                </Button>
              )}
            </div>
          </div>
          <div className='flex items-center pt-3 pb-5'>
            <div className='w-[45px] h-[45px]'></div>
            <p className='ml-3 text-[#303030]'>{data?.video?.desc}</p>
          </div>
          <div className='border-t'>
            <Comments />
          </div>
        </div>
        <div className='w-full lg:w-[35%]'>
          <SameDetail videos={sameVideo && sameVideo} detailId={id} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
