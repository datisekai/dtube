import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonVideo = ({quantify}) => {
    const arrayNumber = Array.from(Array(quantify).keys());
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-5 sm:px-8">
     {arrayNumber.map((item,index) =>  <div key={index}>
        <Skeleton variant="rectangular" height={180}/>
        <Skeleton />
        <Skeleton width="60%" />
      </div>)}
      
    </div>
  );
};

export default SkeletonVideo;
