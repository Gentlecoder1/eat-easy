import { motion, type Variants } from "motion/react";
import type { PropType } from "../types"
import type { MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import Plus from "/images/plus.png"
import minus from "/images/minus.png"
import Cancel from "/images/Cancel.png"
// import Ellipse from "/images/Ellipse-bg.png"

export type ViewDishProps = {
  item: PropType | null;
  onClose: () => void;
}

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
        hidden: { x: "100vw", opacity: 0 },
        visible: {
          x: "0",
          opacity: 1,
          transition: { duration: 0.25 }
        },
        exit: { x: "100vw", opacity: 0 }
    };
  }
  
  // MOBILE — slide from bottom
  return {
      hidden: { y: "100vh", opacity: 0 },
      visible: {
          y: "0",
          opacity: 1,
          transition: { duration: 0.25 }
      },
      exit: { y: "100vh", opacity: 0 }
  };
}

const ViewDish: React.FC<ViewDishProps> = ({ item, onClose }) => {
  const isDesktop = useIsDesktop()

  if (!item) return null;

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full sm:w-[55%] md:w-[45%] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#F7F7F7]"
    >
      <div className="flex flex-col h-full">
        <div onClick={onClose} className="top-0 mt-2 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm sm:hidden" />

        <div className="flex-1 overflow-y-auto scrollbar-hidden py-4">

          <div className="max-w-[600px] min-h-[204px] flex flex-col items-center overflow-hidden relative">

            <div className="w-[454px] h-[444px] absolute -top-[275px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
            <div className="w-[240px] h-[245px] absolute -top-[91px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />

            <img src={item.image} className="mx-auto absolute w-40 h-40" alt="" />

            <img onClick={onClose} src={Cancel} className="ml-auto relative hidden sm:block" alt="" />

            <div className="text-[14px] text-[#C0C0CF] space-x-1 shadow-[0_4px_12px_rgba(0,0,0,0.50)] font-semibold rounded-xl py-1 px-2 bg-[#F7F7F7] ml-auto mr-3 mt-3 sm:mr-auto sm:ml-3 sm:mt-0 relative flex items-center">
              <img src={item.star} className="w-4 h-4" alt="" />
              <p>{item.rating}</p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-[20px] font-bold">{item.name}</p>
              <p className="text-[#FF7B2C] text-[20px] font-extrabold">${item.price}</p>
            </div>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
            <p className="text-[15px] font-500">{item.text}</p>
          </div>
        </div>

        <div className="w-full flex justify-center sticky bottom-0 rounded-t-2xl p-6 bg-white z-10 space-x-4">
          <div className="flex items-center gap-2 rounded-2xl bg-gray-200 p-2">
            <button aria-label="decrease" type="button" className="p-2">
              <img src={minus} className="w-6 h-6 cursor-pointer" alt="-" />
            </button>
            <p className="min-w-[24px] text-center">0</p>
            <button aria-label="increase" type="button" className="p-2">
              <img src={Plus} className="w-6 h-6 cursor-pointer" alt="+" />
            </button>
          </div>
          <motion.div
              whileTap={{ scale: 0.96 }} 
              className='p-3 rounded-2xl bg-[#32324D] text-white cursor-pointer'>Add to order
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ViewDish


        // <div className="relative">
        //   <img src={Ellipse} className="absolute" alt="" />
        //   <img src={PowerImage} className="z-60 w-full h-full mx-auto"  alt="" />
        // </div>