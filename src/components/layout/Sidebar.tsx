import React from 'react'
import { motion } from 'framer-motion'
import Profile from "/images/profile-img.png"
import History from "/images/history-icon.png"
import Reward from "/images/reward-icon.png"
import Help from "/images/help-icon.png"
import Logout from "/images/logout-icon.png"
import Location from "/images/Map-pin.png"
import ChevronLeft from "/images/chevron-left.png"
import FoodMenu from "/images/foodmenu.png"

interface SidebarProps {
  toggle: boolean
  menuOpen: number | null
  setMenuOpen: (id: number | null) => void
  onClose: () => void
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ toggle, menuOpen, setMenuOpen, onClose, onToggle }) => {
  const openMenu = (id: number) => {
    setMenuOpen(menuOpen === id ? null : id)
  }

  return (
    <div className={`w-[70%] sm:w-[75%] h-screen bg-[#32324D] transition-all duration-300 rounded-r-2xl fixed top-0 z-50 ${toggle ?  '-translate-x-0 md:w-[20%]' : 'md:-translate-x-0 md:w-[12%] lg:w-[9%]  -translate-x-[100%]'}`}>
      {/* sidebar toggle button for desktop */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onToggle}
        className='hidden md:block w-10 h-10 bg-[#32324D] border-2 border-white top-25 -right-4 absolute rounded-full p-2'
      >
        <img src={ChevronLeft} className='w-full h-full cursor-pointer' alt="" />
      </motion.button>

      {/* sidebar content */}
      <div className={`flex flex-col h-full text-white text-sm font-semibold transition-all duration-300 ${toggle ? '' : ''}`}>
        <div className={`p-4 flex justify-center border-b-2 border-gray-400 text-3xl transition-all duration-300 ${toggle ?  'text-3xl' : 'text-xl'}`}>Eat<span className='text-amber-500'>Easy</span></div>

        <div className={`flex-1 overflow-y-auto scrollbar-hidden flex flex-col ${toggle ? '' : 'items-center'}`}>
          {/* profile */}
          <div className={`flex md:flex-col gap-4 items-center px-6 mb-10 py-4 ${!toggle ? 'flex-row md:flex-col' : ''}`}>
            <div className='w-15 h-15'><img src={Profile} className='rounded-full w-full h-full' alt="" /></div>
            <div className={`space-y-1 transition-all duration-300`}>
              <p className='text-center'>Robert Fox</p>
              <button className='cursor-pointer hover:text-amber-500'>View Profile</button>
            </div>
          </div>

          {/* menu */}
          <div className='flex justify-center px-8 text-left flex-col space-y-3 mb-6 py-6 border-b-2 border-gray-400'>
            <h1 className='text-[12px]'>MENU</h1>

            <div>
              <motion.button
                onClick={() => openMenu(1)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center mb-3 space-x-3 cursor-pointer'
              >
                <img src={FoodMenu} className='w-11 h-11 bg-amber-500 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Food Menu</p>
              </motion.button>

              <div className={`border-l-2 border-amber-500 px-7 ml-5 space-y-5 ${menuOpen === 1 ? 'flex flex-col' : 'hidden'}`}>
                <motion.div whileTap={{ scale: 0.9 }} className='cursor-pointer'>Smart Assistance</motion.div>
                <motion.div whileTap={{ scale: 0.9 }} className='cursor-pointer'>Full Menu</motion.div>
              </div>
            </div>

            <div>
              <motion.button
                onClick={() => openMenu(2)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center mb-3 space-x-3 cursor-pointer'
              >
                <img src={History} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Order History</p>
              </motion.button>
            </div>

            <div>
              <motion.button
                onClick={() => openMenu(3)}
                whileTap={{ scale: 0.9 }}
                className='flex items-center space-x-3 cursor-pointer'
              >
                <img src={Location} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Location</p>
              </motion.button>
            </div>
          </div>

          {/* General */}
          <div className='flex justify-center px-8 text-left flex-col space-y-3'>
            <h1 className='text-[12px]'>GENERAL</h1>

            <div>
              <motion.button 
                whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={Reward} className='w-11 h-11 hover:bg-gray-600 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>My Rewards</p>
              </motion.button>
            </div>

            <div>
              <motion.button 
                whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={Help} className='w-11 h-11 p-3 hover:bg-gray-600 rounded-2xl' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Help</p>
              </motion.button>
            </div>
          </div>

          {/* Logout */}
          <div className='flex justify-center px-8 text-left flex-col mt-10 space-y-3'>
            <div>
              <motion.button 
                whileTap={{ scale: 0.9 }} className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={Logout} className='w-11 h-11 hover:bg-gray-600 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Logout</p>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
