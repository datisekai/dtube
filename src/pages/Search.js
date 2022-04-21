import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "../components/Sidebar";
import VideoChannel from "../components/VideoChannel";
import { useQueryURL } from "../hooks/useQueryURL";

const Search = () => {
  const searchParams = useQueryURL();
  const query = searchParams.get("query");
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getVideo();
  }, [page, query]);

  const getVideo = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `/video/videos/search?query=${query}&page=${page}`
      );
      setVideos(res.data.videos);
    } catch (err) {
    } finally {
      setLoad(false);
    }
  };

  const handleNext = () => {
    if (videos.length >= 8) {
      setPage(page + 1);
    }
  };

  return (
    <div className='flex justify-between min-h-screen'>
      <Sidebar />
      <div className='hidden lg:block w-[17%]'></div>
      <div className='w-[100%] lg:w-[75%] xl:w-[83%]  bg-[#F9F9F9] p-5 lg:px-10 lg:py-7'>
        <InfiniteScroll
          dataLength={videos?.length}
          next={() => handleNext()}
          hasMore={true}
          loader={
            <div className='dots-loading'>
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
          <div>
            {videos.length > 0 &&
              videos.map((item) => {
                console.log(item);
                return (
                  <VideoChannel
                    key={item?._id}
                    // title={item.title}
                    // desc={item.desc}
                    // image={item.image || item.video.replace("mp4", "jpg")}
                    // createdAt={item.createdAt}
                    // view={item.view}
                    // idVideo={item._id}
                    video={item}
                  />
                );
              })}
          </div>
        </InfiniteScroll>
        {videos.length === 0 && (
          <h2 className='text-lg text-center'>Không tìm thấy kết quả</h2>
        )}
      </div>
    </div>
  );
};

export default Search;
