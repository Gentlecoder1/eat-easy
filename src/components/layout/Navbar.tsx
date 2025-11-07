import {useState} from 'react'
import {motion} from 'framer-motion'
import Gram from "/images/gram-icon.png";
import Burger from "/images/burger-icon.png";
import Location from "/images/location.png";
import Cart from "/images/cart-img.png";
import ArrowLeft from "/images/arrow-left.png";
import FoodMenu from "/images/foodmenu.png";

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const openNav = () => {
    setToggle(!toggle)
  
  }
  
  const [menuOpen, setMenuOpen] = useState(null)
  const openMenu = () => {
    setMenuOpen(prev => (prev === !menuOpen ? null : menuOpen))

    console.log("the menu dropdown was clicked")
  }
  
  return (
    <header className="w-full bg-red-500 border-b border-black">
      {/* mobile */}
      <div className="flex md:hidden justify-between items-center mx-auto p-4">
        <div className="flex space-x-2 items-center">
          <img src={Gram} className="w-8 h-8" alt="" />
          <p className="text-lg font-bold text-gray-700">Gram Bistra</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.96 }} 
          onClick={openNav} className='w-5 h-4 cursor-pointer'>
          <img src={Burger} className='w-full h-full' alt="" />
        </motion.button>
      </div>

      {/* desktop */}
      <div className={`hidden md:flex justify-between items-center px-6 py-3 transition-all duration-300 ${!toggle ?  'ml-[9%]' : 'ml-[20%]'}`}>
        <div className="">
          <h1 className='text-sm font-bold text-gray-700'>Food menu</h1>
          <p className="text-xl font-bold text-gray-900">Browse Our Food Menu</p>
        </div>

        <div className='flex'>
          <motion.button
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.96 }} 
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'> 
            <div className='w-5 h-5'>
              <img src={Location} className='w-full h-full' alt="" />
            </div>
            <p>Gram Bistro</p>
            <div className='w-5 h-5'>
              <img src={ArrowLeft} className='w-full h-full rotate-45' alt="" />
            </div>
          </motion.button>

          <div className='border border-gray-700 my-auto h-7'></div>

          <motion.button
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.96 }} 
            className='flex items-center px-5 justify-center space-x-2 cursor-pointer'> 
            <div className='w-5 h-5'>
              <img src={Cart} className='w-full h-full' alt="" />
            </div>
            <p>My Order</p>
          </motion.button>
        </div>
      </div>

      {/* sidebar */}
      <div className={`w-[70%] sm:w-[75%] h-[100vh] bg-blue-950 backdrop-blur-md transition-all duration-300 rounded-r-2xl absolute top-0 z-50 ${toggle ?  '-translate-x-0 md:w-[20%]' : 'md:-translate-x-0 md:w-[9%]  -translate-x-[100%]'}`}>
        {/* toggle button */}
        <motion.button
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.96 }} 
          onClick={openNav} className='hidden md:block w-10 h-10 bg-blue-950 border-2 border-white top-25 -right-4 absolute rounded-full p-2'>
          <img src={ArrowLeft} className='w-full h-full cursor-pointer' alt="" />
        </motion.button>

        {/* sidebar content */}
        <div className={`flex flex-col text-white text-sm font-semibold transition-all duration-300 ${toggle ? '' : ''}`}>
          <div className={`p-4 flex border-b border-black text-3xl transition-all duration-300 ${toggle ?  'text-3xl' : 'text-xl'}`}>Eat<span className='text-amber-500'>Easy</span></div>

          <div className={`flex gap-4 items-center px-6 mb-10 py-4 ${!toggle ? 'flex-row md:flex-col' : ''}`}>
            <div className='w-15 h-15'><img src={Gram} className='rounded-full w-full h-full' alt="" /></div>
            <div className={`space-y-1 transition-all duration-300`}>
              <p>Robert Fox</p>
              <button className='cursor-pointer'>View Profile</button>
            </div>
          </div>

          {/* menu */}
          <div className='flex justify-center px-8 text-left flex-col space-y-3'>
            <h1 className='text-[12px]'>MENU</h1>

            <div>
              <motion.button
                onClick={openMenu}
                whileTap={{ scale: 0.9 }} 
                className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={FoodMenu} className='w-11 h-11 bg-amber-500 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Food Menu</p>
              </motion.button>
              <div className={`border-l-2 border-amber-500 px-7 ml-5 space-y-5 ${menuOpen ? 'flex flex-col' : 'hidden'}`}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Smart Assistance</motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Full Menu</motion.div>
              </div>
            </div>

            <div>
              <motion.button
                onClick={openMenu}
                whileTap={{ scale: 0.9 }} 
                className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={FoodMenu} className='w-11 h-11 bg-amber-500 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Food Menu</p>
              </motion.button>
              <div className={`border-l-2 border-amber-500 px-7 ml-5 space-y-5 ${menuOpen ? 'flex flex-col' : 'hidden'}`}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Smart Assistance</motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Full Menu</motion.div>
              </div>
            </div>
            
            <div>
              <motion.button
                onClick={openMenu}
                whileTap={{ scale: 0.9 }} 
                className='flex items-center mb-6 space-x-3 cursor-pointer'>
                <img src={FoodMenu} className='w-11 h-11 bg-amber-500 rounded-2xl p-3' alt="" />
                <p className={`${toggle ? 'flex' : 'hidden'}`}>Food Menu</p>
              </motion.button>
              <div className={`border-l-2 border-amber-500 px-7 ml-5 space-y-5 ${menuOpen ? 'flex flex-col' : 'hidden'}`}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Smart Assistance</motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className='cursor-pointer not-last:'
                >Full Menu</motion.div>
              </div>
            </div>
          </div>
        </div>
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