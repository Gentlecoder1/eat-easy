import { motion, type Variants } from "motion/react";
import type { PropType } from "../types"
import { useState, type MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import Plus from "/images/plus.png"
import minus from "/images/minus.png"
import Cancel from "/images/Cancel.png"
import Check from "/images/Checkbox.png"
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

  // track selected topping ids in a Set for O(1) lookups and independent checks
  const [selectedToppings, setSelectedToppings] = useState<Set<number>>(() => new Set())

  const toggleCheck = (id: number) => {
    setSelectedToppings(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const [count, setCount] = useState(1);
  const Increment = () => setCount(c => c + 1);
  const Decrement = () => setCount(c => Math.max(0, c - 1));

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full min-h-screen sm:w-[55%] md:w-[45%] lg:w-[37%] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#f1e6e6]"
    >
      <div className="flex flex-col h-full">
        <div onClick={onClose} className="top-0 my-2 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm sm:hidden" />

        <img onClick={onClose} src={Cancel} className="sticky ml-auto bg-white relative hidden sm:block cursor-pointer top-2 right-2" alt="" />

        <div className="flex-1 overflow-y-auto scrollbar-hidden py-4">

          <div className="max-w-[600px] min-h-[204px] flex flex-col items-center overflow-hidden relative">

            <div className="w-[454px] h-[444px] absolute -top-[265px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
            <div className="w-[240px] h-[245px] absolute -top-[80px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />

            <img src={item.image} className="mx-auto absolute w-35 h-35 rounded-full" alt="" />

            <div className="text-[14px] text-[#C0C0CF] space-x-1 shadow-[0_4px_12px_rgba(0,0,0,0.50)] font-semibold rounded-xl py-1 px-2 bg-[#F7F7F7] ml-auto mr-3 mt-3 sm:mr-auto sm:ml-3 sm:mt-0 relative flex items-center">
              <img src={item.star} className="w-4 h-4" alt="" />
              <p>{item.rating}</p>
            </div>
          </div>

          <div className="p-[24px] space-y-[25px] mb-[50px]">
            <div className="flex justify-between items-center">
              <p className="text-[20px] font-bold">{item.name}</p>
              <p className="text-[#FF7B2C] text-[20px] font-extrabold">${item.price}</p>
            </div>
            <p className="text-[15px] font-500">{item.text}</p>

            <div className="p-[10px] space-x-[10px] flex justify-between bg-[#FFFFFF] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
              {item.nutrients.map((nut) => (
                <div className="px-2 text-center">
                  <p className="text-[14px] font-semibold">{nut.amount}</p>
                  <p className="text-[12px] font-600">{nut.unit}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h1 className="text-[18px] font-semibold">Ingredients</h1>
              <div className="py-[10px] space-x-[10px] flex flex-nowrap overflow-x-auto scrollbar-hidden">
                {item.ingredients.map((ingredient) => (
                  <div className="py-[12px] min-w-[80px] space-y-[10px] text-center flex flex-col items-center bg-[#FFFFFF] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                    <img src={ingredient.ingimage} alt="" />
                    <p className="text-[12px] font-600">{ingredient.ingname}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* add toppings */}
            <div>
              <h1 className="text-[18px] font-semibold">Add toppings</h1>
              <div className="py-[10px] space-y-[10px] flex flex-col">
                {item.toppings.map((top) => (
                  <div key={`${top.id}`} className="p-[14px] text-center flex items-center justify-between bg-[#FFFFFF] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                    <div className="flex space-x-2 items-center">
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleCheck(top.id)}
                        className="w-4 h-4 border border-black rounded-sm cursor-pointer flex items-center justify-center">
                        <img src={Check} alt="" className={`w-4 h-4 ${selectedToppings.has(top.id) ? 'block' : 'hidden'}`} />
                      </motion.div>

                      <p className="text-[12px] font-600">{top.name}</p>
                    </div>

                    <p className="text-[14px] font-semibold">${top.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* footer section */}
        <div className="w-full flex justify-center sticky bottom-0 rounded-t-2xl sm:rounded-bl-2xl rounded-b-none p-3 bg-[#FCFCFC] z-10 space-x-4">
          <div className="flex items-center w-[127px] space-x-3 rounded-2xl bg-gray-200 p-2">
            {/* decrement button */}
            <button onClick={Decrement} type="button" disabled={count === 0} className={count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}>
              <img src={minus} className="w-6 h-6" alt="-" />
            </button>

            <p className=" text-center">{count}</p>
            {/* increment button */}
            <button onClick={Increment} type="button" className="">
              <img src={Plus} className="w-6 h-6 cursor-pointer" alt="+" />
            </button>
          </div>
          <motion.div
              whileTap={{ scale: 0.96 }} 
              className='w-full text-center p-3 rounded-2xl bg-[#32324D] text-white cursor-pointer flex justify-center space-x-2'>
                <p>Add to order</p>
                <p className="font-bold">${ (item.price * count).toFixed(2) }</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ViewDish
