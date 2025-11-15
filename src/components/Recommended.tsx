import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "./layout/Navbar"
import Burger from "/images/burger-icon.png"
import GridIcon from "/images/grid-icon.png"
import ListIcon from "/images/list-icon.png"
import AvocadoImage from "/images/Avocado-img.png"
import ChickenBreast from "/images/chicken-breast.png"
import ChickenSalad from "/images/chicken-salad.png"
import CurryImage from "/images/curry-img.png"
import MacImage from "/images/Mac-image.png"
import PowerImage from "/images/power-img.png"
import VegImage from "/images/vegetable-img.png"
import StarHalf from "/images/star-half-icon.png"
import Baklava from "/images/image-baklava.jpg"
import Brownie from "/images/image-brownie.jpg"
import Cake from "/images/image-cake.jpg"
import Creme from "/images/image-creme-brulee.jpg"
import Macaron from "/images/image-macaron.jpg"
import Meringue from "/images/image-meringue.jpg"
import Panna from "/images/image-panna-cotta.jpg"
import Tiramisu from "/images/image-tiramisu.jpg"
import Waffle from "/images/image-waffle.jpg"
import { NavLink } from 'react-router-dom'

const Recommended: React.FC = () => {

  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const [click, setClick] = useState(0)
  const [menu, setMenu] = useState(0)

  const toggleNav = () => {
    setToggle(prev => !prev)
    if (!toggle) {
      // when opening, keep menuOpen as is
    } else {
      // when closing clear submenu
      setMenuOpen(null)
    }
  }

  const closeNav = () => {
    setToggle(false)
    setMenuOpen(null)
  }

  const Eat = [
    {
      image: AvocadoImage,
      name: "Avocado and Egg Toast",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: ChickenSalad,
      name: "Avocado Chicken Salad",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: ChickenBreast,
      name: "Chicken Breast",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: CurryImage,
      name: "Curry Salmon",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: MacImage,
      name: "Mac and Cheese",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: PowerImage,
      name: "Power Bowl",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    },
    {
      image: VegImage,
      name: "Vegetable Salad",
      rating: "4.9",
      star: StarHalf,
      reviews: "120",
      price: "$10.40"
    }
  ]

  const Drink = [
    { image: PowerImage, name: "Orange Smoothie", rating: "4.8", star: StarHalf, reviews: "98", price: "$4.50" },
    { image: AvocadoImage, name: "Avocado Shake", rating: "4.7", star: StarHalf, reviews: "76", price: "$5.20" },
    { image: MacImage, name: "Iced Latte", rating: "4.6", star: StarHalf, reviews: "210", price: "$3.80" },
    { image: CurryImage, name: "Ginger Tea", rating: "4.5", star: StarHalf, reviews: "44", price: "$2.40" },
    { image: ChickenSalad, name: "Detox Green Juice", rating: "4.7", star: StarHalf, reviews: "63", price: "$6.00" },
    { image: VegImage, name: "Berry Blast", rating: "4.9", star: StarHalf, reviews: "150", price: "$5.90" }
  ]

  const Dessert = [
    { image: Baklava, name: "Pistachio Baklava", rating: "4.9", star: StarHalf, reviews: "320", price: "$3.20" },
    { image: Brownie, name: "Salted Caramel Brownie", rating: "4.6", star: StarHalf, reviews: "88", price: "$4.40" },
    { image: Cake, name: "Red Velvet Cake", rating: "4.7", star: StarHalf, reviews: "74", price: "$4.80" },
    { image: Creme, name: "Vanilla Bean Crème Brûlée", rating: "4.8", star: StarHalf, reviews: "110", price: "$5.50" },
    { image: Macaron, name: "Macaron Mix of Five", rating: "4.5", star: StarHalf, reviews: "45", price: "$4.20" },
    { image: Panna, name: "Vanilla Panna Cotta", rating: "4.7", star: StarHalf, reviews: "95", price: "$3.90" },
    { image: Meringue, name: "Lemon Meringue Pie", rating: "4.8", star: StarHalf, reviews: "140", price: "$3.60" },
    { image: Tiramisu, name: "Classic Tiramisu", rating: "4.8", star: StarHalf, reviews: "140", price: "$3.60" },
    { image: Waffle, name: "Waffle with Berries", rating: "4.8", star: StarHalf, reviews: "140", price: "$3.60" }
  ]

  const datasets = [Eat, Drink, Dessert];
  const datum = datasets[menu];

  
  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen">

      <Navbar toggle={toggle} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleNav={toggleNav} closeNav={closeNav} title="Virtual Assitant" text="Our Smart Assistant Recommendations" text1='Gram Bistro' link='/Recommended' />

      <div className={`transition-all duration-300 ${!toggle ?  'md:ml-[12%] lg:ml-[9%]' : 'md:ml-[20%]'}`}>
        <div className='max-w-6xl mx-auto flex flex-col p-6 space-y-5'>
          <div className='md:hidden flex justify-between items-center'>
            <h1 className='text-[22px] lg:text-[32px] text-[#32324D] font-bold'>We think you might enjoy these specially selected dishes</h1>
          </div>

          <div className='md:p-4 md:rounded-2xl md:shadow-[0_4px_12px_rgba(0,0,0,0.10)] md:bg-white flex justify-between items-center mb-10'>
            <div className={`flex md:w-fit h-fit md:mx-0 md:justify-items-normal mx-auto w-full justify-between space-x-4 md:space-x-0 lg:space-x-2 text-[15px] text-black transition-all duration-900`}>
                <div
                    onClick={() => setMenu(0)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 0 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Eat
                </div>

                <div
                    onClick={() => setMenu(1)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 1 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Drink
                </div>

                <div
                    onClick={() => setMenu(2)}
                    className={`relative h-fit text-center py-2 px-4 w-20 rounded-2xl cursor-pointer transition-colors duration-900 ${menu === 2 ? 'bg-amber-500 text-white' : 'bg-none'}`}
                >
                    Dessert
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    // onClick={handleToggle}
                    className='cursor-pointer bg-white rounded-2xl p-3 md:hidden'
                    >
                    <img src={Burger} className='w-4 h-3' alt="" />
                </motion.button>
            </div>

            
            {/* Desktop */}
            <div className='hidden md:flex items-center space-x-4 text-[15px]'>
                <div className='cursor-pointer'>View mode</div>
                <div className={`rounded-2xl border border-[#32324D] flex w-fit h-fit transition-all duration-300`}>
                  <div
                      onClick={() => setClick(0)}
                      className={`relative w-fit h-fit text-center p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 0 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                  >
                      <img src={ListIcon} className='w-3 h-3' alt="" />
                  </div>

                  <div
                      onClick={() => setClick(1)}
                      className={`relative w-fit h-fit text-center p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${click === 1 ? 'bg-[#32324D] text-white' : 'bg-none'}`}
                  >
                      <img src={GridIcon} className='w-3 h-3' alt="" />
                  </div>
                </div>

                <div className='border border-gray-400 my-auto h-4'></div>

                <motion.div
                    whileTap={{ scale: 0.96 }} 
                    className='p-3 rounded-2xl bg-[#32324D] text-white cursor-pointer'>Ask for new proposal
                </motion.div>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            {datum.map((eat, idx) => (
              <div key={`eat-${menu}-${idx}`} className='rounded-2xl flex justify-between items-center shadow-[0_4px_12px_rgba(0,0,0,0.10)] bg-white p-3 group'>
                <div className='flex space-x-3 items-center'>
                  <div className='rounded-full'><img src={eat.image} className='max-w-[100px] max-h-[100px] rounded-full' alt="" /></div>
                  <div className=''>
                    <p className='text-[15px] lg:text-[18px] font-semibold'>{eat.name}</p>

                    <div className=' text-[14px] text-[#C0C0CF] font-semibold mb-2'>
                      <div className='space-x-1 flex items-center'>
                        <img src={eat.star} className='w-4 h-4' alt="" />
                        <p>{eat.rating}</p> 
                      </div>  
                      <span>({eat.reviews} reviews)</span>
                    </div>

                    <p className='text-[#FF7B2C] text-[15px] lg:text-[18px] font-extrabold'>{eat.price}</p>
                  </div>
                </div>
                <motion.div whileTap={{ scale: 0.9 }} className='hidden group-hover:flex w-fit h-fit cursor-pointer text-[#FF7B2C] text-[24px] font-extrabold rounded-2xl p-2 bg-[#FFF2EA]'>+</motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommended