import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Button, Popover } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDisplayUpdate, setIdUpdate } from "../redux/modalUpdateVideo";
import { convertTime, to_slug } from "../utils/base";
import ImgLazy from "../utils/ImgLazy";

const VideoChannel = ({ onDelete, video }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idDisplay = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.modalUpdateVideo);

  const { user } = useSelector((state) => state.user);

  console.log(video);

  return (
    <>
      <div className='flex justify-between items-start'>
        <Link to={`/watch/${video?._id}/${to_slug(video?.title)}`}>
          <div className='flex mt-3 cursor-pointer'>
            <ImgLazy
              lazy_src={video?.image || video?.video?.replace("mp4", "jpg")}
              className={"w-[140px] md:w-[250px] aspect-[16/9] object-cover"}
            />
            <div className='ml-3'>
              <h2 className='text-xl'>{video?.title}</h2>
              <div className='flex items-center text-gray-600 text-xs mt-0'>
                <p>{video?.view} lượt xem</p>
                <span className='px-2'>-</span>
                <p>{convertTime(video?.createdAt)}</p>
              </div>
              <p className='text-xs text-gray-600 mt-3'>{video?.desc}</p>
            </div>
          </div>
        </Link>
        {user?._id === video?.userId && (
          <div className='mt-3'>
            <i
              className=' text-lg px-2 py-1 hover:cursor-pointer fa-solid fa-ellipsis-vertical'
              onClick={(e) => setAnchorEl(e.currentTarget)}
            ></i>
            <Popover
              id={idDisplay}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className='border-b'>
                <Button
                  variant='text'
                  color='error'
                  onClick={() => {
                    dispatch(setDisplayUpdate(true));
                    dispatch(setIdUpdate(video?._id));
                  }}
                >
                  <EditTwoToneIcon />
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => onDelete(video?._id)}
                  variant='text'
                  color='error'
                >
                  <DeleteTwoToneIcon />
                </Button>
              </div>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoChannel;
