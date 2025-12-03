import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import { NavLink } from 'react-router-dom'
import AI from "/images/AI-image.png"
import Add from "/images/add.svg"
import ChevronDown from "/images/chevron-down.png"
import type { PropType } from "../types"

const OrderStatus: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)
  const [order, setOrder] = useState<any>(null)

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('eat-easy-last-order')
      if (raw) setOrder(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to read saved order', e)
    }
  }, [])

  return (
    <div className="w-full min-h-screen">

      <div className=''>
        <Navbar showHeader={true} showAside={true} showBack={true} toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Gram Bistro" text="Your Order" text1='Your Order' link='' />
      </div>

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col items-center py-6 px-6 sm:px-20 md:px-6 space-y-10 my-5'>

          <div className='flex flex-col md:flex-row gap-[12px] w-full'>

            <div className='bg-[#FFFFFF] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] pt-[30px] min-w-[327px] md:w-[65%] h-[388px] md:h-fit overflow-clip gap-[21px] flex flex-col items-center'>
                
              <h1 className='w-[200px] text-[16px] text-[#8E8EA9] font-semibold '>Your order will be ready in <b className='text-[18px] text-[#FFB01D] font-extrabold'>10 minutes</b></h1>

              <div className='lg:max-w-1/2'>
                  <img src={AI} alt="" />
              </div>
            </div>

            <div className='bg-[#FFFFFF] text-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] rounded-[16px] p-[20px] space-y-[16px] min-w-[327px] md:w-[35%] h-[437px] md:h-fit'>
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
                {order?.items ? (
                  order.items.map((sent: any) => (
                    <div key={sent.id} className='flex justify-between items-center gap-[8px]'>
                      <div className='flex items-center gap-[8px]'>
                        <img src={sent.image} className='w-[50px] h-[50px] rounded-full' alt="" />
                        <p className='text-left text-[14px] font-semibold'>{sent.name}</p>
                      </div>
                      <p className='text-[14px]'>
                        <span>{sent.qty}</span>x
                        ${' '}
                        <b>{(sent.price ?? 0).toFixed(2)}</b>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-[14px] text-[#8E8EA9]'>No order found.</p>
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