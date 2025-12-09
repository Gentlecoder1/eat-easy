import { motion } from "motion/react";
import { MotionContainer, SlideIn, PopIn, FadeIn } from "./animations/motion";
import { CiSearch } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SetLocation = () => {
  const cards = [
    {
      image: "/images/qr-code.svg",
      heading: "Scan QR Code",
      description: "Choose the simple way, scan your QR Code from our table",
    },
    {
      image: "/images/location.svg",
      heading: "Select location manually",
      description:
        "If you prefer to add your location manually, here is your option",
    },
  ];

  return (
    <div className="w-full h-full mt-3 md:mt-0 px-6">
      <MotionContainer className="w-full md:hidden">
        <SlideIn direction="down" className="px-6">
          <h1 className="font-medium text-[22px] text-(--neutral-800) text-center heading-font">
            Set your locations
          </h1>
        </SlideIn>

        <div className="grid grid-cols-1 gap-6 mt-6 px-6">
          {cards.map((card, index) => (
            <motion.div whileTap={{ scale: 0.99 }} key={index}>
              <PopIn className="flex flex-col p-5 gap-5 items-center justify-center text-center rounded-2xl shadow-md">
                <motion.div
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-[70px] h-[70px]"
                >
                  <img src={card.image} alt="Card Image" className="w-full" />
                </motion.div>
                <p className="font-semibold text-base text-(--neutral-900)">
                  {card.heading}
                </p>
                <p className="font-medium text-sm text-(--neutral-600)">
                  {card.description}
                </p>
              </PopIn>
            </motion.div>
          ))}
        </div>
      </MotionContainer>

      <MotionContainer className="w-full h-screen flex-col items-center justify-center max-w-[700px] mx-auto hidden md:flex">
        <SlideIn direction="down" className="w-full text-center space-y-4">
          <h1 className="heading-font text-(--neutral-800) font-medium text-[40px]">
            Start the Smart Menu Experience
          </h1>
          <p className="font-medium text-(--neutral-600) text-base">
            Please enter your location or use your current location and enjoy
            custom experience in any of our restuarants.
          </p>
        </SlideIn>

        <PopIn className="w-full mt-[42px] bg-white p-6 rounded-[20px] space-y-5">
          <FadeIn className="w-full">
            <div className="w-full flex items-center justify-center px-4 py-3 rounded-2xl border border-(--neutral-150) bg-white">
              <input
                type="text"
                className="outline-none border-none w-full placeholder:text-(--neutral-500)"
                placeholder="Search for streets, districts, cities..."
              />
              <CiSearch size={20} className="text-(--neutral--300) cursor-pointer" />
            </div>
          </FadeIn>
          <FadeIn>
            <div
              className="w-full border-[1.5px] border-(--neutral-150) h-[212px] rounded-2xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/Map.svg')" }}
            ></div>
          </FadeIn>

          <div className=" w-full flex items-center gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-px text-(--purple-3) cursor-pointer"
            >
              <HiOutlineLocationMarker size={20} />
              <span className="font-semibold text-base">
                Use my current location
              </span>
            </motion.button>
            <div className="border border-(--neutral-200) h-full w-4 bg-(--neutral-200) rotate-90"></div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-px text-(--purple-3) cursor-pointer"
            >
              <HiOutlineLocationMarker size={20} />
              <span className="font-semibold text-base">
                Set my location on the map
              </span>
            </motion.button>
          </div>
        </PopIn>
      </MotionContainer>
    </div>
  );
};

export default SetLocation;
