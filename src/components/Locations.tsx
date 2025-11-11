import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import MapFrame from "/images/Map Frame2.png"
import Location from "/images/Map-pin.png"
import PopSign from "/images/popsign.png"
import ArrowRight from "/images/arrow-right.png"
import { NavLink } from 'react-router-dom'

const Locations: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const toggleNav = () => {
    setToggle(prev => !prev)
    if (!toggle) {
      // when opening, keep menuOpen as is
    } else {
      // when closing clear submenu
      setMenuOpen(null)
    }
  }

  const closeNav = () => {
    setToggle(false)
    setMenuOpen(null)
  }

  const Available = [
    { address: '790 8th Ave New York', distance: '0.6 hrs away' },
    { address: '733 8th Ave New York', distance: '1.2 hrs away' },
    { address: '606 8th Ave New York', distance: '3.6 hrs away' },
    { address: '123 8th Ave New York', distance: '0.7 hrs away' }
  ]

  return (
    <div className="bg-gray-300 w-full h-screen"
        style={{ backgroundImage: `url(${MapFrame})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      <Navbar toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Food Menu" text="Browse Our Food Menu" image={Location} text1='Gram Bistro' link='/' />

      <div 
        className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='bg-white max-w-[1000px] mx-auto flex flex-col items-center p-6 space-y-10 rounded-2xl shadow-xl'>

            <div className='flex items-center'>
                <p className='xl:text-[32px] lg:text-[28px] md:text-[20px] font-bold'>Set your location</p>
                <span className='lg:w-[30px] lg:h-[30px] w-[25px] h-[25px]'><img src={PopSign} className='w-full h-full' alt="" /></span>
            </div>

            <div className='p-2 rounded-2xl border border-gray-500 flex items-center justify-between'>
                <input 
                    type="text"    
                    placeholder='Search for streets, cities, districts...'
                    className='bg-transparent outline-none'
                 />

                 <motion.button
                    whileTap={{ scale: 0.9 }} 
                    className='w-7 h-8'
                 >
                    <img src={Location} className='w-full h-full' alt="" />
                 </motion.button>
            </div>

           
            <div className='flex  flex-col items-center rounded-2xl bg-white shadow-2xl'>
              {Available.map((option, idx) => (
                <div key={idx} className='flex space-y-4 items-center rounded-2xl sm:w-[80%] md:w-full p-5'>
                    <motion.div 
                        whileTap={{ scale: 0.9 }} 
                        className='cursor-pointer flex justify-between'>
                            <p className='lg:text-[16px] text-[16px] font-500 text-[#8E8EA9]'>{option.address}</p>
                            <span className='flex items-center'>
                                <img src={ArrowRight} className='w-5 h-5' alt="" />
                                <p className='lg:text-[16px] text-[16px] font-500 text-[#8E8EA9]'>{option.distance}</p>
                            </span>
                    </motion.div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Locations