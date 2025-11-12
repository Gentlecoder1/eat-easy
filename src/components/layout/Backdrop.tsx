import {motion} from 'framer-motion'

interface BackdropProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='absolute flex items-center justify-center inset-0 bg-black/50 z-40 md:hidden top-0 left-0'
        onClick={onClick}>
        {children}
    </motion.div>
  )
}

export default Backdrop