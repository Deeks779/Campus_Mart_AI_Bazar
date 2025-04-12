import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.banner} alt="banner" className='w-full h-[600px] object-cover hidden md:block'/>
      <img src={assets.banner_sm} alt="banner" className='w-full h-[400px] object-cover md:hidden'/>

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'
        >Connecting Deals, Creating Value </h1>
      

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-[#071F3B] hover:bg-[#26303b] transition rounded text-white cursor-pointer'>
        Shop now
        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
        </Link>

        <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
        Browse Campus Deals 
        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
        </Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner
