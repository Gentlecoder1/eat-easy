import {useState} from 'react'
import {motion} from 'framer-motion'
import Gram from "/public/images/gram-icon.png";
import Burger from "/public/images/burger-icon.png";

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const openNav = () => setToggle(!toggle)

  return (
    <header className="w-full bg-white">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-4">
        <div className="flex space-x-2 items-center">
          <img src={Gram} className="w-8 h-8" alt="" />
          <p className="text-lg font-bold text-gray-700">Gram Bistra</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={openNav} className='w-5 h-4'>
          <img src={Burger} className='w-full h-full' alt="" />
        </motion.button>
      </div>

      <div className={`p-5 w-[40%] sm:w-[45%] h-[100vh] bg-purple-500 backdrop-blur-md transition-all duration-300 overflow-hidden rounded-r-2xl fixed z-50 ${toggle ?  'md:hidden -translate-x-0' : '-translate-x-[100%]'}`}>

        

      </div>
      {/* backdrop: clicking this closes the mobile nav */}
      {toggle && (
          <div
              className='fixed inset-0 bg-black/50 z-40 md:hidden'
              onClick={() => setToggle(!toggle)}
              aria-hidden='true'
          />
      )}
    </header>
  )
}

export default Navbar