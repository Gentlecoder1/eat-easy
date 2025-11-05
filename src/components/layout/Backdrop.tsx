import React from 'react'
import {motion} from 'framer-motion'

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='absolute flex items-center justify-center inset-0 bg-black/50 z-40 md:hidden'
        onClick={onClick}>
        {children}
    </motion.div>
  )
}

export default Backdrop