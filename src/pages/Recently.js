import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";
import { convertTime } from "../utils/base";
import { getLocal } from "../utils/local";

const MyVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(getLocal());
  }, []);

  return (
    <div className='flex justify-between min-h-screen'>
      <Sidebar />
      <div className='hidden lg:block w-[17%]'></div>
      <div className='w-[100%] lg:w-[75%] xl:w-[83%]  bg-[#F9F9F9]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 px-5 sm:px-8'>
          {videos.length > 0 &&
            videos?.map((item) => (
              <Video
                key={item._id}
                image={item.image || item?.video?.replace("mp4", "jpg")}
                title={item.title}
                id={item._id}
                userId={item?.userId?._id}
                name={item?.userId?.email?.slice(
                  0,
                  item?.userId?.email?.indexOf("@")
                )}
                createAt={convertTime(item.createdAt)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyVideo;
