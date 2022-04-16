import React from "react";
import { Avatar } from "@mui/material";
import { limitString } from "../utils/base";
import ImgLazy from "../utils/ImgLazy";
import { Link } from "react-router-dom";

const Video = ({ image, title, name, createAt, userId, id,view, avatar }) => {
  return (
    <div>
      <Link to={`/watch/${id}`}>
        {" "}
        <ImgLazy
          lazy_src={image}
          className="w-full object-cover aspect-video"
        />
      </Link>
      <div className="flex mt-2">
        <Avatar alt="Remy Sharp" src={avatar || "/static/images/avatar/2.jpg"} />
        <div className="ml-3">
          <Link to={`/watch/${id}`}>
            {" "}
            <h3 className="w-full font-medium">{limitString(title, 50)}</h3>
          </Link>
          <Link to={`/channel/${userId}`}>
            {" "}
            <p className="text-[#666] hover:text-black text-sm mt-2 capitalize">
              {name}
            </p>
          </Link>
          <div className="flex mt-1">
            <p className="text-[#666] hover:text-black text-sm ">
              {view} lượt xem
            </p>
            <p className="text-[#666] hover:text-black text-sm ml-3">
              {createAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
