import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import Burger from "/images/burger-icon.png"
import GridIcon from "/images/grid-icon.png"
import ListIcon from "/images/list-icon.png"
import { NavLink } from 'react-router-dom'

const Recommended: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const [click, setClick] = useState(0)
  const [menu, setMenu] = useState(0)

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

  
  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen">

      <Navbar toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Virtual Assitant" text="Our Smart Assistant Recommendations" text1='Gram Bistro' link='/Recommended' />

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col p-6 space-y-5'>
          <div className='md:hidden flex justify-between items-center'>
            <h1 className='text-[22px] lg:text-[32px] text-[#32324D] font-bold'>We think you might enjoy these specially selected dishes</h1>
          </div>

          <div className='md:p-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white flex justify-between items-center'>
            <div className={`flex md:w-fit h-fit md:mx-0 md:justify-items-normal mx-auto w-full justify-between space-x-4 md:space-x-0 lg:space-x-2 text-[15px] text-black transition-all duration-900`}>
                <div
                    onClick={() => setMenu(0)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 0 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Eat
                </div>

                <div
                    onClick={() => setMenu(1)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 1 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Drink
                </div>

                <div
                    onClick={() => setMenu(2)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 2 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Dessert
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    // onClick={handleToggle}
                    className='cursor-pointer bg-white rounded-2xl p-3 md:hidden'
                    >
                    <img src={Burger} className='w-4 h-3' alt="" />
                </motion.button>
            </div>

            
            {/* Desktop */}
            <div className='hidden md:flex items-center space-x-4 text-[15px]'>
                <div className='cursor-pointer'>View mode</div>
                <div className={`rounded-2xl border border-[#32324D] flex w-fit h-fit transition-all duration-300`}>
                  <div
                      onClick={() => setClick(0)}
                      className={`relative w-fit h-fit text-center p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 0 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                  >
                      <img src={ListIcon} className='w-3 h-3' alt="" />
                  </div>

                  <div
                      onClick={() => setClick(1)}
                      className={`relative w-fit h-fit text-center p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 1 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                  >
                      <img src={GridIcon} className='w-3 h-3' alt="" />
                  </div>
                </div>

                <div className='border border-gray-400 my-auto h-4'></div>

                <motion.div
                    whileTap={{ scale: 0.96 }} 
                    className='p-3 rounded-2xl bg-[#32324D] text-white cursor-pointer'>Ask for new proposal
                </motion.div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommended