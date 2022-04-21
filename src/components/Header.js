import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Avatar, Badge, Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFollow } from "../redux/followReducer";
import { resetLike } from "../redux/likeReducer";
import { resetSaveVideo } from "../redux/saveVideoReducer";
import { setDisplaySidebar } from "../redux/sidebarReducer";
import { logout } from "../redux/userReducer";
import { logo } from "../utils/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = () => {
  const [display, setDisplay] = useState(false);
  const displaySidebar = useSelector((state) => state.sidebar.display);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const typeTimeOut = useRef(null);
  const [displaySearch, setDisplaySearch] = useState(false);
  const microRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setDisplay(false);
    });
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(resetFollow());
    dispatch(resetLike());
    dispatch(resetSaveVideo());
    setDisplay(false);
    navigate("/");
  };

  const handleChangeQuery = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (typeTimeOut.current) {
      clearTimeout(typeTimeOut.current);
    }

    typeTimeOut.current = setTimeout(() => {
      navigate(`/search?query=${value}`);
    }, 500);
  };

  // const handleVoice = (e) => {
  //   const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  //   const recognition = new SpeechRecognition();
  //   recognition.lang = "vi-VI";
  //   recognition.continuous = false;
  //   microRef.current.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     recognition.start();
  //   });

  //   microRef.current.onspeechend = () => {
  //     recognition.stop();
  //   };

  //   microRef.current.onerror = (err) => {
  //     console.error(err);
  //   };

  //   microRef.current.onresult = (e) => {
  //     const text = e.results[0][0].transcript;
  //     console.log(text);
  //   };
  // };

  return (
    <header className='bg-white w-full px-5 sm:px-8 py-2 flex justify-between items-center border-b'>
      <div className='flex items-center md:w-[30%] '>
        <i
          onClick={() => dispatch(setDisplaySidebar(!displaySidebar))}
          className='block lg:hidden text-xl fa-solid fa-bars hover:opacity-80 transition-all cursor-pointer'
        ></i>
        <div className='relative ml-1'>
          <img
            className='w-[120px] h-[50px] object-cover cursor-pointer ml-4 md:ml-0'
            src={logo}
            alt={logo}
            onClick={() => navigate("/")}
          />

          {display && (
            <ul className='fixed right-0 bg-white rounded-md pb-5 border z-20'>
              <li className='flex items-center border-b py-2 px-5'>
                <Avatar
                  alt={user?.name || "https://source.unsplash.com/random"}
                  src={user?.avatar || "https://source.unsplash.com/random"}
                />
                <h3 className='ml-5 max-w-[70px] truncate'>
                  {user?.name || user?.email || "Datisekai"}
                </h3>
              </li>
              <li
                onClick={() => {
                  navigate(`/channel/${user._id}`);
                  setDisplay(false);
                }}
                className='flex items-center py-2 px-7 hover:bg-[#f2f2f2] transition-all cursor-pointer'
              >
                <i className='border p-1 rounded-md fa-solid fa-user'></i>
                <p className='ml-5'>Kênh của bạn</p>
              </li>
              <li className='flex items-center py-2 px-7 hover:bg-[#f2f2f2] transition-all cursor-pointer'>
                <i className='border p-1 rounded-md fa-solid fa-circle-question'></i>
                <p className='ml-5'>Trợ giúp</p>
              </li>
              <li
                className='flex items-center py-2 px-7  hover:bg-[#f2f2f2] transition-all cursor-pointer'
                onClick={handleLogOut}
              >
                <i className='border p-1 rounded-md bx bx-log-out'></i>
                <p className='ml-5'>Đăng xuất</p>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className='w-[40%] hidden md:block'>
        <TextField
          id='outlined-basic'
          className='w-full'
          InputLabelProps={{ style: { fontWeight: "500" } }}
          size='small'
          label='Tìm kiếm'
          variant='outlined'
          onChange={(e) => handleChangeQuery(e)}
        />
      </div>
      <div className='flex items-center justify-end w-[30%]'>
        <div className='hidden sm:block  mr-4 cursor-pointer'>
          <Badge badgeContent={4} color='primary'>
            <NotificationsNoneOutlinedIcon fontSize='large' color='action' />
          </Badge>
        </div>
        <i
          className='block sm:hidden mr-4 text-3xl bx bx-search-alt-2'
          onClick={() => setDisplaySearch(true)}
        ></i>
        {displaySearch && (
          <div
            className='fixed bg-[rgba(0,0,0,0.8)] inset-0 z-10 block md:hidden'
            onClick={() => setDisplaySearch(false)}
          ></div>
        )}
        {displaySearch && (
          <div className='fixed bg-[#f1f1f1] h-[78px]  flex md:hidden items-center z-30  top-0 left-0 right-0 p'>
            <i
              className='text-2xl px-4 text-[#606060] fa-solid fa-arrow-left'
              onClick={() => setDisplaySearch(false)}
            ></i>
            <TextField
              className=''
              fullWidth
              id='filled-basic'
              InputLabelProps={{
                style: { fontWeight: "500", padding: "0px 8px" },
              }}
              size='small'
              label='Tìm kiếm'
              variant='filled'
              onChange={(e) => handleChangeQuery(e)}
            />
            <i className='text-xl px-2 text-[#606060] fa-solid fa-magnifying-glass'></i>
            <i
              className='text-xl px-3 text-[#606060]  fa-solid fa-microphone'
              ref={microRef}
            ></i>
          </div>
        )}
        {user && (
          <div onClick={() => setDisplay(!display)}>
            <Avatar
              alt='Remy Sharp'
              src={user?.avatar || "https://source.unsplash.com/random"}
            />
          </div>
        )}
        {!user && (
          <Button
            onClick={() => navigate("/login")}
            color='error'
            variant='contained'
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
