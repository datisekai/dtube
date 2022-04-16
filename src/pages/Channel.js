import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MyChannel } from '../components/MyChannel'
import Sidebar from '../components/Sidebar'

const Channel = () => {
  return (
    <div className='flex justify-between min-h-screen'>
        <Sidebar/>
        <div className="hidden lg:block w-[17%]"></div>
       <Routes>
         <Route path='/' element={ <MyChannel/>}></Route>
         <Route path='/video' element={ <MyChannel/>}></Route>
         <Route path='/channel' element={ <MyChannel/>}></Route>
       </Routes>
    </div>
  )
}

export default Channel