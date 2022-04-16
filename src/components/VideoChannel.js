import React from 'react'
import ImgLazy from '../utils/ImgLazy'
import {convertTime} from '../utils/base'
import { Link } from 'react-router-dom'

const VideoChannel = ({title, desc,image,createdAt,view,id}) => {
  return (
    <Link to={`/watch/${id}`}>
    <div className='flex mt-3 cursor-pointer'>
       <ImgLazy lazy_src={image} className={'w-[140px] md:w-[250px] aspect-video'}/>
       <div className='ml-3'>
           <h2 className='text-xl'>{title}</h2>
           <div className='flex items-center text-gray-600 text-xs mt-0'>
               <p>{view} lượt xem</p><span className='px-2'>-</span>
               <p>{convertTime(createdAt)}</p>
           </div>
           <p className='text-xs text-gray-600 mt-3'>{desc}</p>
       </div>
    </div></Link>
  )
}

export default VideoChannel