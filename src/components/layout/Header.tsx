import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiMenu2Fill } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import ArrowLeft from "/images/arrow-left.png";
import { NavLink } from "react-router-dom";

type HeaderProps = {
  onToggle?: () => void;
  toggle?: boolean;
  title?: string;
  text?: string;
  image?: string;
  text1?: string;
  link: string;
  showBack?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  onToggle,
  toggle,
  title,
  text,
  text1,
  link,
  showBack,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const controlled =
    typeof onToggle === "function" && typeof toggle === "boolean";
  const effectiveOpen = controlled ? toggle : isOpen;

  const handleToggle = () => {
    if (controlled) {
      onToggle && onToggle();
    } else {
      setIsOpen((v) => !v);
    }
  };

  return (
    <>
      <div className="flex md:hidden justify-between items-center mx-auto">
        <div className="flex space-x-2 items-center">
          {showBack && link ? (
            <NavLink to={link}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 cursor-pointer border border-gray-600 rounded-sm"
                aria-label="Back"
              >
                <img src={ArrowLeft} className="w-4 h-4" alt="Back" />
              </motion.button>
            </NavLink>
          ) : (
            <HiOutlineLocationMarker
              size={20}
              className="text-(--neutral-200)"
            />
          )}
          <p className="text-(--neutral-500) font-semibold text-base">
            {text1}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleToggle}
          className="cursor-pointer"
        >
          <RiMenu2Fill size={24} className="text-(--neutral-700)" />
        </motion.button>
      </div>

      <div
        className={`hidden md:flex justify-between items-center transition-all duration-300 ${
          !effectiveOpen ? "md:ml-36 lg:ml-40" : "md:ml-[260px] lg:ml-[300px]"
        }`}
      >
        <div className="flex items-center gap-2">
          {showBack && link && (
            <NavLink to={link}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 cursor-pointer border border-gray-600 rounded-sm"
                aria-label="Back"
              >
                <img src={ArrowLeft} className="w-4 h-4" alt="Back" />
              </motion.button>
            </NavLink>
          )}
          <div className="">
            <h1 className="font-semibold text-sm text-(--neutral-500)">{title}</h1>
            <p className="heading-font font-normal text-[18px]">{text}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 text-(--purple-3) px-6 py-3">
            <HiOutlineLocationMarker size={20}/>
            <motion.button
            whileTap={{scale: 0.95}}
            className="flex items-center gap-2">
              <span className="font-semibold text-sm">Gbam Bistro</span>
              <IoChevronDown size={20}/>
            </motion.button>
          </div>

          <div className="py-3">
            <div className="border border-(--neutral-200) h-full"></div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 gap-2"
          >
            <IoCartOutline size={20}/>
            <p className="font-semibold text-sm text-(--purple-3)">
              My Order
            </p>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Header;
