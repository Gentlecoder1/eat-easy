import { motion, type Variants } from "motion/react";
// import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import type { PropType } from "../types"
import { useState, type MouseEvent } from "react"
import Header from "./layout/Header"
import Plus from "/images/plus.svg"
import minus from "/images/minus.svg"
import Cancel from "/images/Cancel.png"
import Location from "/images/Map-pin.png"

export type ViewOrderProps = {
  items: PropType[];
  onClose: () => void;
}

// const display = (isDesktop: boolean): Variants => {
//   if (isDesktop) {
//     // slide in from the RIGHT on desktop
//     return {
//         hidden: { x: "100vw", opacity: 0 },
//         visible: {
//           x: "0",
//           opacity: 1,
//           transition: { duration: 0.25 }
//         },
//         exit: { x: "100vw", opacity: 0 }
//     };
//   }
  
//   return {
//        hidden: { x: "100vw", opacity: 0 },
//       visible: {
//         x: "0",
//         opacity: 1,
//         transition: { duration: 0.25 }
//       },
//       exit: { x: "100vw", opacity: 0 }
//   };
// }

const ViewOrder: React.FC<ViewOrderProps> = ({ items, onClose }) => {
  // const isDesktop = useIsDesktop();

  if (!items || items.length === 0) return null;

  const [isOpen, setIsOpen] = useState(false)

  // const [count, setCount] = useState(1);
  // const Increment = () => setCount(c => c + 1);
  // const Decrement = () => setCount(c => Math.max(0, c - 1));

  // subtotal: sum of item prices (you can expand to include toppings/counts)
  const orderTotal = items.reduce((sum, t) => sum + (t.price || 0), 0)

  // tax at 11%
  const tax = orderTotal * 0.11


  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{
        x: "0",
        opacity: 1,
        transition: { duration: 0.25 }
      }}
      exit={{ x: "100vw", opacity: 0 }}
      className="z-50 right-0 w-full min-h-screen sm:w-[55%] md:w-[45%] lg:w-[37%] md:rounded-l-2xl bg-[#f1e6e6]"
    >
      {/* header for mobile */}
      <div className='w-full md:hidden'>
        <Header
          toggle={isOpen}
          onToggle={() => setIsOpen(v => !v)}
          title='Gram Bistro'
          text='Your order' 
          text1='' 
          link='' 
          showBack={true}
        />
      </div>

      {/* header for destop */}
      <div className="hidden md:flex justify-between items-center p-4 mx-auto">
        <div className="flex items-center">
          <h1 className="px-3">My Order</h1>

          <div className='border border-gray-700 my-auto h-7'></div>

          <div className="px-3">
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p className='md:text-[12px] lg:text-[14px] font-600 text-[#8E8EA9]'>Gram Bistro</p>
          </div>
        </div>

        <motion.img 
          whileTap={{ scale: 0.96 }} 
          onClick={onClose} src={Cancel} 
          className="sticky ml-auto bg-white hidden sm:block cursor-pointer top-6 right-2 z-50" 
          alt="" 
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden justify-center">
        <div className="p-[24px] space-y-[25px]">

          <div className='flex flex-col'>
            {items.map((order) => (
              <div key={`${order.id}`} className='rounded-2xl items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white p-3 group'>
                <div className='flex space-x-3 items-center relative'>
                  <div className='rounded-full'><img src={order.image} className='max-w-[100px] max-h-[100px] rounded-full' alt="" /></div>
                  <div className=''>
                    <p className='text-[15px] lg:text-[18px] font-semibold'>{order.name}</p>

                    <div className=' text-[14px] text-[#C0C0CF] font-semibold mb-2'>
                      <div className='space-x-1 flex items-center'>
                        <img src={order.star} className='w-4 h-4' alt="" />
                        <p>{order.rating}</p> 
                      </div>  
                      <span>({order.reviews} reviews)</span>
                    </div>

                    <p className='text-[#FF7B2C] text-[15px] lg:text-[18px] font-extrabold'>${(order.price).toFixed(2)}</p>
                  </div>
                  <motion.div 
                    whileTap={{ scale: 0.9 }}
                    className='flex justify-self-end absolute right-0 bottom-0'>
                      <img src={Plus} className='w-fit h-fit cursor-pointer rounded-xl p-2 bg-[#FFF2EA]' alt="" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            whileTap={{ scale: 0.96 }}
            className="flex mx-auto"
          >
            <p>+</p>
            <p>Add more food to order</p>
          </motion.div>

          <div className="border border-x-gray-700 py-5 space-y-5">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p className="text-bold">${(orderTotal).toFixed(2)}</p>
            </div>
              <div className="flex justify-between items-center">
              <p>Tax</p>
              <p className="text-bold">${tax.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p>Total Price</p>
            <p className="text-bold">${(orderTotal + tax).toFixed(2)}</p>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default ViewOrder


// my mother says you whole life is in the hand of God : John Bellion