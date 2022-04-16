import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useWidth from "../hooks/useWidth";
import { convertTime, limitString } from "../utils/base";
import Video from "./Video";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "./SkeletonVideo";
import { useParams } from "react-router-dom";
import LoadingPart from "./LoadingPart";

const Videos = ({ onClickSetValue, value, onNextPage, loading,load }) => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);
  const { videos } = useSelector((state) => state.video);
  const { type } = useSelector((state) => state.type);
  const width = useWidth();
  let slide;
  if (width >= 1024) {
    slide = 8;
  } else if (width >= 768 && width < 1024) {
    slide = 5;
  } else if (width >= 400 && width < 768) {
    slide = 2.5;
  } else {
    slide = 2;
  }

  return (
    <div className="w-[100%] lg:w-[75%] xl:w-[83%]  bg-[#F9F9F9] relative">
      {load && <LoadingPart/>}
      {
        <div className="py-4 bg-white border-b px-5 sm:px-8">
          <Swiper
            navigation
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={slide}
          >
            <SwiperSlide>
              <div
                className={`${
                  value === "" ? "bg-[#030303] text-gray-100" : "bg-[#F2F2F2]"
                } rounded-2xl px-1 py-1 text-center border font-normal cursor-pointer`}
                onClick={() => onClickSetValue("")}
              >
                {limitString("Tất cả", 8)}
              </div>
            </SwiperSlide>
            {type?.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className={`${
                    item._id === value
                      ? "bg-[#030303] text-gray-100"
                      : "bg-[#F2F2F2]"
                  } rounded-2xl px-1 py-1 text-center border font-normal cursor-pointer truncate`}
                  onClick={() => onClickSetValue(item._id)}
                >
                  {limitString(item.name, 8)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }

      <InfiniteScroll
        dataLength={videos?.length}
        next={() => onNextPage()}
        hasMore={true}
        loader={
          <div className="dots-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 px-5 sm:px-8">
          {videos?.map((item) => (
            <Video
              key={item._id}
              image={item.image || item.video.replace("mp4", "jpg")}
              title={item.title}
              id={item._id}
              userId={item.userId._id}
              view={item.view}
              avatar={item.userId.avatar}
              name={item.userId.name || item.userId.email.slice(0, item.userId.email.indexOf("@"))}
              createAt={convertTime(item.createdAt)}
            />
          ))}
        </div>
      </InfiniteScroll>
      {loading === true && <SkeletonVideo quantify={8} />}
    </div>
  );
};

export default Videos;
