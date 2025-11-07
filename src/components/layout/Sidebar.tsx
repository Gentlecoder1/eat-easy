import React from 'react'
import Backdrop from './Backdrop'
import {motion} from 'framer-motion'

interface SidebarProps {
  handleClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} 
        className="w-[20%] left-0 top-0 h-screen">

      </motion.div>

    </Backdrop>
  )
}

export default Sidebar