import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { setDisPlayProfile } from "../redux/modalProfileReducer";
import { setDisplayModal } from "../redux/modalUploadReducer";
import { getUserChannel } from "../redux/userChannel";

const ChannelController = () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.modalUpload);
  const { user } = useSelector((state) => state.userChannel);
  const { id } = useParams();

  const userLogin = useSelector((state) => state.user.user);

  useEffect(() => {
    if (id) {
      dispatch(getUserChannel(id));
    }
  }, [id]);

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-start sm:justify-between items-center px-5 py-4 sm:px-24 '>
        <div className='flex items-center'>
          <Avatar
            alt='Remy Sharp'
            src={user?.avatar || "/static/images/avatar/1.jpg"}
            sx={{ width: 80, height: 80 }}
          />
          <div className='px-5'>
            <h1 className='text-xl md:text-2xl capitalize'>
              {user?.name || user?.email?.slice(0, user?.email?.indexOf("@"))}
            </h1>
            <p className='text-gray-600 text-md'>
              {user?.follows?.length || 0} người đăng ký
            </p>
          </div>
        </div>
        {userLogin?._id === user?._id && (
          <div className='flex items-center'>
            <div className='mt-3 sm:mt-0'>
              {id === user._id && (
                <Button
                  onClick={() => dispatch(setDisPlayProfile(true))}
                  variant='contained'
                >
                  Quản lý kênh
                </Button>
              )}
            </div>
            <div className='mt-3 sm:mt-0 ml-1'>
              {id === user._id && (
                <Button
                  onClick={() => dispatch(setDisplayModal(!display))}
                  variant='contained'
                >
                  Upload Video
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='px-5 sm:px-24 flex items-center'>
        <NavLink to={`/channel/${id}/`} activeclassname='active'>
          <div className=' rounded-sm px-5 sm:px-7 py-2  cursor-pointer'>
            <h3 className='uppercase font-medium text-[16px]'>Trang chủ</h3>
          </div>
        </NavLink>
        <NavLink to={`/channel/${id}/video`} activeclassname='active'>
          <div className=' rounded-sm px-5 sm:px-7 py-2 cursor-pointer'>
            <h3 className='uppercase font-medium text-gray-600 text-[16px]'>
              Video
            </h3>
          </div>
        </NavLink>
        <NavLink to={`/channel/${id}/channel`} activeclassname='active'>
          <div className=' rounded-sm px-5 sm:px-7 py-2 cursor-pointer'>
            <h3 className='uppercase font-medium text-gray-600 text-[16px]'>
              kênh
            </h3>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default ChannelController;
