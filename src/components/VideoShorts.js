import React, { useEffect, useMemo, useRef, useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import useElementOnScreen from "../hooks/useElementOnScreen";

const VideoShorts = ({ video, videos }) => {
  const { user } = useSelector((state) => state.user);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes.length);
  const [isDislike, setIsDislike] = useState(false);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 0.7,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  useEffect(() => {
    if (user) {
      setIsLike(video.likes.some((item) => item === user._id));
      setIsDislike(video.dislikes.some((item) => item === user._id));
    }
  }, [user]);

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  useEffect(() => {
    const handleTime = () => {
      const currentTime = Math.round(videoRef.current.currentTime);
      const total = videoRef.current.duration;
      if ((+currentTime / +total) * 100 > 80) {
        axios.get(`/video/view/${video._id}`);
        videoRef.current.removeEventListener("timeupdate", handleTime);
      }
    };
    videoRef.current &&
      videoRef.current.addEventListener("timeupdate", handleTime);
    return () => {
      videoRef.current &&
        videoRef.current.removeEventListener("timeupdate", handleTime);
    };
  }, []);

  const handleLike = async () => {
    if (user) {
      if (isLike && !isDislike) {
        setLikeCount(likeCount - 1);
        setIsLike(false);
      } else if (!isLike && isDislike) {
        setIsLike(true);
        setLikeCount(likeCount + 1);
        setIsDislike(false);
      } else {
        setLikeCount(likeCount + 1);
        setIsLike(true);
        setIsDislike(false);
      }
      await axios.post(`/video/like/${video._id}`);
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };

  const handleDisLike = async () => {
    if (user) {
      if (isLike && !isDislike) {
        setIsDislike(true);
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } else if (!isLike && isDislike) {
        setIsDislike(false);
      } else {
        setIsDislike(true);
        setIsLike(false);
      }
      await axios.post(`/video/dislike/${video._id}`);
    } else {
      toast.error("Bạn phải đăng nhập");
    }
  };
  return (
    <div className='flex justify-between w-[90%] lg:w-[300px] mx-auto mt-8 pb-5'>
      <video
        className='w-[80%] lg:w-[500px] rounded-lg aspect-[9/20]'
        src={video.video}
        controls
        ref={videoRef}
      ></video>
      <div className='w-[10%] px-0 lg:px-2 lg:w-[100px] flex flex-col-reverse items-center'>
        <div
          className='text-center text-[#606060] cursor-pointer'
          onClick={handleDisLike}
        >
          {!isDislike ? <ThumbDownAltOutlinedIcon /> : <ThumbDownAltIcon />}

          <p className='text-center text-sm lg:text-md'>Không thích</p>
        </div>
        <div
          className='text-center text-[#606060] cursor-pointer'
          onClick={handleLike}
        >
          {!isLike ? <ThumbUpAltOutlinedIcon /> : <ThumbUpIcon />}

          <p className='text-center'>{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoShorts;
