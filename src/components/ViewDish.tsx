import { motion, type Variants } from "motion/react";
import type { PropType } from "../types"
import type { MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
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
      className="z-50 fixed right-0 w-full md:w-[45%] h-full top-[15%] md:top-0 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl bg-[#F7F7F7] overflow-y-hidden">
      <div 
        className="py-4 flex flex-col"
      >
        <div onClick={onClose} className="top-0 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm mb-3 md:hidden"></div>

        <div className="max-w-[600px] min-h-[264px] flex flex-col items-center overflow-hidden relative">
          <div className="w-[454px] h-[444px] absolute -top-[275px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
          </div>
          <div className="w-[240px] h-[245px] absolute -top-[91px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
          </div>

          <img src={item.image} className="mx-auto absolute w-40 h-40"  alt="" />

          <img onClick={onClose} src={Cancel} className="ml-auto relative hidden md:block"  alt="" />

          <div className="text-[14px] text-[#C0C0CF] space-x-1 shadow-[0_4px_12px_rgba(0,0,0,0.50)] font-semibold rounded-xl py-1 px-2 bg-[#F7F7F7] ml-auto mr-3 mt-3 md:mr-auto md:ml-3 md:mt-0 relative flex items-center">
            <img src={item.star} className='w-4 h-4' alt="" />
            <p>{item.rating}</p>
          </div>
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