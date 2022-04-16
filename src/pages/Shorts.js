import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPart from "../components/LoadingPart";
import Sidebar from "../components/Sidebar";
import VideoShorts from "../components/VideoShorts";
import Loading from "../utils/Loading";

const Shorts = () => {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(false)
    const limit = 2;

    useEffect(() => {
        getShorts()
    },[page])

    const getShorts = async(req, res) => {
        try {
          
            setLoad(true)
            const res =  await axios.get(`/video/videos/shorts?page=${page}`)

            setVideos([...videos, ...res.data.videos])
            
        } catch (error) {
            
        }
        finally{
          setLoad(false)
        }
    }

    const handleNextPage = () => {
        if(videos.length >= limit)
        {
            setPage(page + 1)
        }
    }
  return (
    <div className="flex justify-between min-h-screen">
      <Sidebar />
      <div className="hidden lg:block w-[17%]"></div>
      <div className="w-[100%] lg:w-[75%] xl:w-[83%]  bg-[#F9F9F9] relative">
        {load && page < 2 && <LoadingPart/>}
        <InfiniteScroll
          dataLength={videos?.length}
          next={() => handleNextPage()}
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
          <div>
          {videos?.map((item,index) => <VideoShorts key={`${item._id}${index}`} videos={videos} video={item}/>)}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Shorts;
