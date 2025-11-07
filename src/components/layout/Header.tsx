import React from 'react'
import { motion } from 'framer-motion'
import Location from "/images/Map-pin.png"
import ChevronDown from "/images/chevron-down.png"
import Cart from "/images/cart-img.png"
import Gram from "/images/gram-icon.png"
import Burger from "/images/burger-icon.png"

interface HeaderProps {
  onToggle: () => void
  toggle: boolean
}

const Header: React.FC<HeaderProps> = ({ onToggle, toggle }) => {
  return (
    <>
      {/* mobile */}
      <div className="flex md:hidden justify-between items-center mx-auto p-4">
        <div className="flex space-x-2 items-center">
          <img src={Gram} className="w-8 h-8" alt="" />
          <p className="text-lg font-bold text-gray-700">Gram Bistra</p>
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
        <div>
          <h1 className='text-sm font-bold text-gray-700'>Food menu</h1>
          <p className="text-xl font-bold text-gray-900">Browse Our Food Menu</p>
        </div>

        <div className='flex'>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'
          >
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p>Gram Bistro</p>
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
            <p>My Order</p>
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default Header
