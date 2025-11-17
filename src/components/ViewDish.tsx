import Backdrop from "./layout/Backdrop"
import { motion, type Variants } from "motion/react";
import type { PropType } from "../types"
import type { MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"

export type ViewDishProps = {
  item: PropType | null;
  onClose: () => void;
}

const display = (isDesktop: boolean): Variants => {
    if (isDesktop) {
        // DESKTOP — slide from left
        return {
            // slide in from the RIGHT on desktop
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

//   if (isDesktop) {
    return (
    <Backdrop onClick={onClose}>
      <motion.div
        variants={display(isDesktop)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="z-50 fixed right-0 w-full md:w-[600px] h-full top-[15%] md:top-0 rounded-t-2xl md:rounded-r-2xl bg-[#F7F7F7]">
        <div onClick={(e: MouseEvent) => e.stopPropagation()}>
          <p>This is details of the food item clicked</p>
        </div>
      </motion.div>
    </Backdrop>
    )
//   }

//   return (
//     <Backdrop onClick={onClose}>
//       <motion.div
//         variants={display(isDesktop)}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className="z-50 fixed right-0 w-full md:w-[1000px] h-full top-[15%] md:top-0 rounded-t-2xl md:rounded-r-2xl bg-[#F7F7F7]">
//         <div onClick={(e: MouseEvent) => e.stopPropagation()}>
//           <p>This is details of the food item clicked</p>
//         </div>
//       </motion.div>
//     </Backdrop>
//   )
}

export default ViewDish

// direction={isDesktop ? "left" : "up"}