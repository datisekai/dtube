import React from "react";
import { convertTime, limitString } from "../utils/base";
import { Link } from "react-router-dom";

const SameDetail = ({ videos, detailId }) => {
  const data = videos;
  const videoRender =
    data?.videos?.filter((item) => item._id !== detailId) || [];

  return (
    <div className='px-0 lg:px-8 mt-5 lg:mt-0'>
      <h3 className='text-lg font-medium'>Video có liên quan</h3>
      {videoRender?.length === 0 && <p>Không tìm thấy video liên quan</p>}
      {videoRender?.length > 0 &&
        videoRender?.map((item) => (
          <Link key={item._id} to={`/watch/${item._id}`}>
            <div className='flex mt-3'>
              <img
                src={item.image || item.video.replace("mp4", "jpg")}
                className='w-[50%] md:w-[40%] aspect-video object-cover rounded-md'
                alt=''
              />
              <div className='w-[50%] md:w-[60%] ml-3'>
                <h3 className='text-md font-medium'>
                  {limitString(item.title, 50)}
                </h3>
                <p className='text-md text-[#606060]'>
                  {limitString(
                    item.userId.name ||
                      item.userId.email.slice(
                        0,
                        item.userId.email.indexOf("@"),
                        30
                      )
                  )}
                </p>
                <div className='flex items-center text-sm mt-1 text-[#606060]'>
                  <p>{item.view} lượt xem</p>
                  <span className='px-1'>-</span>
                  <p>{convertTime(item.createdAt)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SameDetail;
