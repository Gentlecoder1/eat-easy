import React from 'react'
import { motion } from 'framer-motion'
import Location from "/images/Map-pin.png"
import ChevronDown from "/images/chevron-down.png"
import Cart from "/images/cart-img.png"
import Burger from "/images/burger-icon.png"
import ArrowLeft from "/images/arrow-left.png"
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  onToggle: () => void
  toggle: boolean
  title: string
  text: string
  image: string
  text1: string
  link: string
}

const Header: React.FC<HeaderProps> = ({ onToggle, toggle, title, text, image, text1, link }) => {
  return (
    <>
      {/* mobile */}
      <div className="flex md:hidden justify-between items-center mx-auto p-4">
        <div className="flex space-x-2 items-center">
          <NavLink to={link}><img src={image} className="w-6 h-6" alt="" /></NavLink>
          <p className="text-lg font-bold text-gray-700">{text1}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onToggle}
          className='w-5 h-4 cursor-pointer'
        >
          <img src={Burger} className='w-full h-full' alt="" />
        </motion.button>
      </div>

      {/* desktop header */}
      <div className={`hidden md:flex justify-between items-center px-6 py-3 transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'ml-[20%]'}`}>
        <div className='flex items-center gap-2'>
          <NavLink to={link}>
            <motion.button whileTap={{ scale: 0.9 }}  
              className='p-2 cursor-pointer border border-gray-600 rounded-sm'>
                <img src={ArrowLeft} className='w-4 h-4' alt="" />
            </motion.button>
          </NavLink>
          <div className=''>
            <h1 className='text-[14px] font600 text-[#8E8EA9]'>{title}</h1>
            <p className="text-[20px] font-500 text-gray-900">{text}</p>
          </div>
        </div>

        <div className='flex'>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
          >
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p className='text-[14px] font-600 text-[#8E8EA9]'>Gram Bistro</p>
            <div className='w-5 h-5'>
              <img src={ChevronDown} className='w-full h-full' alt="" />
            </div>
          </motion.button>

          <div className='border border-gray-700 my-auto h-7'></div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
          >
            <div className='w-5 h-5'>
              <img src={Cart} className='w-full h-full' alt="" />
            </div>
            <p className='text-[14px] font-600 text-[#8E8EA9]'>My Order</p>
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default Header
