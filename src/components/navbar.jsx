import React, { Component } from 'react'
import logo from './tudolist.jpg';

const navbar = () => {
  return (
    <div className='sticky top-0 left-0 right-0 shadow-2xl'>
      <nav className='bg-gray-950 text-white px-5 flex items-center justify-between lg:justify-around p-2 lg:px-10'>
        <div className="logo ">
            <img width={50} src={logo} alt="" />
        </div>
        <div className="heading">
            <ul className='flex gap-4 font-bold'>
                <li className='hover:cursor-pointer  hover:text-gray-300'>Home</li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default navbar
