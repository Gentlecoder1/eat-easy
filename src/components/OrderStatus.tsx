import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import { NavLink } from 'react-router-dom'
import AI from "/images/AI-image.png"
import Add from "/images/add.svg"
import ChevronDown from "/images/chevron-down.png"
import Avocado from "/images/Avocado-img.png"
import type { PropType } from "../types"

export type OrderStatusProps = {
  items: PropType[];
  onClose: () => void;
}

const OrderStatus: React.FC = () => {
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

  const [toggleList, setToggleList] = useState(false)

  return (
    <div className="w-full min-h-screen">

      <div className=''>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Gram Bistro" text="Your Order" text1='Your Order' link='' />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center py-6 px-6 sm:px-20 lg:px-6 space-y-10 my-5'>
            <div className='flex flex-col md:flex-row gap-[12px]'>
                <div className='bg-[#FFFFFF] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] pt-[30px] w-[327px] md:w-full h-[388px] md:h-full overflow-clip gap-[21px] flex flex-col items-center'>
                    
                    <h1 className='w-[200px] text-[16px] text-[#8E8EA9] font-semibold '>Your order will be ready in <b className='text-[18px] text-[#FFB01D] font-extrabold'>10 minutes</b></h1>

                    <div className='lg:max-w-1/2'>
                        <img src={AI} alt="" />
                    </div>
                </div>

                <div className='bg-[#FFFFFF] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] p-[14px] space-y-[16px]'>
                  <div className='flex justify-between items-center'>
                      <p className='text-[#DCDCE4] font-semibold'>Order list and prices</p>
                      <img 
                          onClick={() => {setToggleList(!toggleList)}} 
                          src={ChevronDown} 
                          className={`w-5 h-5 ${ toggleList ? 'rotate-180' : '' }`} 
                          alt="" 
                      />
                  </div>

                  <div className='space-y-[12px]'>
                    {items.map(sent) => (
                      <div className='flex justify-between items-center '>
                          <div className='flex items-center gap-[px]'>
                              <img src={Avocado} className='w-[50px] h-[50px] rounded-full' alt="" />

                              <p className='text-[14px] font-semibold'>Avocado and Egg Toast</p>
                          </div>
                          <p className='text-[14px]'>
                              <span>2</span>x
                              $<b>20.00</b>
                          </p>
                      </div>
                    )}
                  </div>

                  <motion.div 
                      whileTap={{ scale: 0.96 }}
                      className="flex mx-auto items-center cursor-pointer space-x-2 w-fit"
                  >
                      <img src={Add} alt="" />
                      <p className="text-[#FFB01D]">Add more food to order</p>
                  </motion.div>

                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus