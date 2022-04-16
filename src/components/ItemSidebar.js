import React from "react";
import { NavLink, useParams } from "react-router-dom";

const ItemSidebar = ({ content, icon, size, link }) => {
  return (
    <NavLink
      to={`${link}`}
      
      className={
        "flex items-center w-full h-full hover:bg-[#E5E5E5] transition-all cursor-pointer px-10 py-2 "
      }
    >
      <i className={`text-${size || "lg"} text-center w-[30%] ${icon}`}></i>
      <p className="w-[70%] text-lg">{content}</p>
    </NavLink>
  );
};

export default ItemSidebar;
