import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDisplaySidebar } from "../redux/sidebarReducer";
import { logo } from "../utils/base";
import ItemSidebar from "./ItemSidebar";

const Sidebar = () => {
  const display = useSelector((state) => state.sidebar.display);
  const dispatch = useDispatch();
  return (
    <div>
      {display && (
        <div
          onClick={() => dispatch(setDisplaySidebar(false))}
          className='fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[90]'
        ></div>
      )}
      <div
        className={`w-[60%] sm:w-[50%] md:w-[35%] bg-white lg:w-[25%] xl:w-[17%] top-0 min-h-full fixed inset-0 lg:block z-[100] ${
          display ? "block" : "hidden"
        } border-r`}
      >
        {
          <div className='flex px-5 items-center mt-2'>
            <i
              onClick={() => dispatch(setDisplaySidebar(!display))}
              className='block lg:hidden text-xl fa-solid fa-bars hover:opacity-80 transiton-all cursor-pointer'
            ></i>
            <Link to={"/"}>
              <img
                className='w-[120px] h-[50px] object-cover cursor-pointer ml-4 md:ml-2'
                src={logo}
                alt={logo}
              />
            </Link>
          </div>
        }
        <div className='mt-4 border-b pb-4'>
          <ItemSidebar
            content={"Trang chủ"}
            icon='fa-solid fa-house'
            link={"/"}
          />
          <ItemSidebar
            content={"Shorts"}
            icon='fa-solid fa-arrow-down-short-wide'
            link={"/shorts"}
          />
          <ItemSidebar
            content={"Thịnh hành"}
            icon={"fa-solid fa-jet-fighter-up"}
            size='xl'
            link={"/popular"}
          />
          <ItemSidebar
            content={"Kênh đăng ký"}
            icon='fa-solid fa-play'
            link={"/subscription"}
          />
        </div>
        <div className='mt-4 border-b pb-4'>
          <ItemSidebar
            content={"Video đã xem"}
            icon='fa-solid fa-clock-rotate-left'
            link={"/history"}
          />
          <ItemSidebar
            content={"Video của bạn"}
            icon={"bx bx-play-circle"}
            size='xl'
            link={"/my-video"}
          />
          <ItemSidebar
            content={"Xem sau"}
            icon={"bx bx-stopwatch"}
            size='2xl'
            link={"/play-list"}
          />
          <ItemSidebar
            content={"Video đã thích"}
            icon={"bx bx-like"}
            size='xl'
            link={"/play-like"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
