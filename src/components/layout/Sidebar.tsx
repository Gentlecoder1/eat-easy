import React, { useState } from "react";
import { motion } from "framer-motion";
import Profile from "/images/profile-img.png";
import { IoIosLogOut } from "react-icons/io";
import { PiMedalThin } from "react-icons/pi";
import ChevronLeft from "/images/chevron-left.png";
import { NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";
import { MdOutlineHistory } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { useTheme } from "../../hooks/useTheme";

type SidebarProps = {
  toggle?: boolean;
  menuOpen?: number | null;
  setMenuOpen?: (id: number | null) => void;
  onClose?: () => void;
  onToggle?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  toggle,
  menuOpen,
  setMenuOpen,
  onToggle,
}) => {
  const { theme } = useTheme();
  // desktop toggle useState
  const [isOpen, setIsOpen] = useState(false);
  // menu accordion useState
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  // selected item highlighting (Food Menu default)
  const [selectedItem, setSelectedItem] = useState<number | null>(1);

  const controlledOpen =
    typeof toggle === "boolean" && typeof onToggle === "function";

  const effectiveIsOpen = controlledOpen ? toggle : isOpen;

  const activeMenu = menuOpen !== undefined ? menuOpen : openMenuId;

  const handleToggle = () => {
    if (controlledOpen) {
      onToggle && onToggle();
    } else {
      setIsOpen((v) => !v);
    }
  };

  const toggleMenu = (id: number) => {
    if (typeof setMenuOpen === "function") {
      setMenuOpen(menuOpen === id ? null : id);
    } else {
      setOpenMenuId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <aside
      className={`aside h-screen transition-transform duration-300 ease-in-out rounded-r-3xl fixed left-0 top-0 z-50
      w-[260px]
      ${effectiveIsOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      ${effectiveIsOpen ? "md:w-[260px]" : "md:w-36"}`}
    >
      <div className="hidden md:flex w-[38px] h-[38px] bg-(--neutral-800) top-28 -right-4 absolute rounded-full items-center justify-center border border-(--neutral-400)">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleToggle}
          className="rounded-full"
        >
          <img
            src={ChevronLeft}
            className={`w-full h-full cursor-pointer ${
              effectiveIsOpen ? "rotate-0" : " rotate-180"
            }`}
            alt=""
          />
        </motion.button>
      </div>

      <div
        className={`flex flex-col h-full transition-all duration-300 ${
          toggle ? "" : ""
        }`}
      >
        <div
          className={`py-5 flex justify-center items-center text-center transition-all duration-300 text-[24px] `}
        >
          <span className="font-medium text-(--neutral-100)">Eat</span>
          <span className="font-bold text-(--orange-1)">Easy</span>
        </div>

        <div className="w-full h-px bg-gray-500"></div>

        <div
          className={`flex-1 overflow-y-auto scrollbar-hidden flex flex-col px-[30px] pt-5 pb-6  ${
            effectiveIsOpen ? "" : "items-center"
          }`}
        >
          <div
            className={`flex items-center gap-[22px] ${
              !effectiveIsOpen ? "flex-row md:flex-col" : ""
            }`}
          >
            <div className="w-[68px] h-[68px] rounded-full">
              <img
                src={Profile}
                className="w-full"
                alt="Profile Picture Image"
              />
            </div>

            <div className="text-white space-y-1.5">
              <p className="font-semibold text-base">Robert Fox</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer font-medium text-sm underline outline-none border-none"
              >
                View Profile
              </motion.button>
            </div>
          </div>

          <div className="flex justify-center flex-col mt-10 pt-[18px]">
            <h1 className="text-[13px] font-semibold text-(--neutral-150)">
              MENU
            </h1>

            <div className="w-full space-y-4 mt-4">
              <div className="space-y-4">
                <motion.button
                  onClick={() => {
                    toggleMenu(1);
                    setSelectedItem(1);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedItem === 1 ? "bg-(--yellow-1)" : "bg-white/15"
                    }`}
                  >
                    <TfiBook className="text-white" size={24} />
                  </div>
                  <p
                    className={`${
                      selectedItem === 1
                        ? "text-(--yellow-1) font-bold"
                        : "text-white"
                    } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                  >
                    Food Menu
                  </p>
                </motion.button>
                {effectiveIsOpen && (
                  <div
                    className={`border-l-2 border-(--yellow-2) ml-[25px] space-y-4 pl-[33px]  ${
                      activeMenu === 1 ? "flex flex-col" : "hidden"
                    }`}
                  >
                    <NavLink to="/recommended">
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer font-medium text-base text-white"
                      >
                        Smart Assistant
                      </motion.div>
                    </NavLink>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer font-medium text-base text-white"
                    >
                      Full Menu
                    </motion.div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <motion.button
                  onClick={() => setSelectedItem(2)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedItem === 2 ? "bg-(--yellow-1)" : "bg-white/15"
                    }`}
                  >
                    <MdOutlineHistory className="text-white" size={24} />
                  </div>
                  <p
                    className={`${
                      selectedItem === 2
                        ? "text-(--yellow-1) font-bold"
                        : "text-white"
                    } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                  >
                    Order History
                  </p>
                </motion.button>
              </div>

              <div className="space-y-4">
                <NavLink to="/locations">
                  <motion.button
                    onClick={() => setSelectedItem(3)}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        selectedItem === 3 ? "bg-(--yellow-1)" : "bg-white/15"
                      }`}
                    >
                      <IoLocationOutline className="text-white" size={24} />
                    </div>

                    <p
                      className={`${
                        selectedItem === 3
                          ? "text-(--yellow-1) font-bold"
                          : "text-white"
                      } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                    >
                      Location
                    </p>
                  </motion.button>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white mt-9 mb-9"></div>

          <div
            className={`flex justify-center flex-col ${
              toggle ? "" : "items-center"
            }`}
          >
            <h1 className="text-[13px] font-semibold text-(--neutral-150)">
              GENERAL
            </h1>
            <div className="mt-4 space-y-4">
              <div className="space-y-4">
                <motion.button
                  onClick={() => setSelectedItem(4)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedItem === 4 ? "bg-(--yellow-1)" : "bg-white/15"
                    }`}
                  >
                    <PiMedalThin className="text-white" size={24} />
                  </div>

                  <p
                    className={`${
                      selectedItem === 4
                        ? "text-(--yellow-1) font-bold"
                        : "text-white"
                    } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                  >
                    My Rewards
                  </p>
                </motion.button>
              </div>

              <div className="space-y-4">
                <motion.button
                  onClick={() => setSelectedItem(5)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      selectedItem === 5 ? "bg-(--yellow-1)" : "bg-white/15"
                    }`}
                  >
                    <IoIosHelpCircleOutline className="text-white" size={24} />
                  </div>

                  <p
                    className={`${
                      selectedItem === 5
                        ? "text-(--yellow-1) font-bold"
                        : "text-white"
                    } text-base ${effectiveIsOpen ? "flex" : "hidden"}`}
                  >
                    Help
                  </p>
                </motion.button>
              </div>

              <div className="flex items-center gap-2.5 w-full py-1.5">
                <div className="p-3 rounded-2xl bg-white/15 cursor-pointer">
                  <ThemeSwitchButton />
                </div>
                <p
                  className={`text-white text-base ${
                    effectiveIsOpen ? "flex" : "hidden"
                  }`}
                >
                  {theme === "dark" ? "Dark" : "Light"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 items-center">
            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 w-full py-1.5 cursor-pointer"
              >
                <div className="p-3 rounded-2xl bg-white/15">
                  <IoIosLogOut className="text-white" size={24} />
                </div>

                <p
                  className={`font-medium text-base text-white ${
                    effectiveIsOpen ? "flex" : "hidden"
                  }`}
                >
                  Logout
                </p>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
