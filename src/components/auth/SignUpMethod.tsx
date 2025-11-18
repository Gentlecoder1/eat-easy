import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ThemeSwitchButton from "../ThemeSwitchButton";

function SignUpMethod() {
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => setAnimateBar(true), []);

  return (
    <MotionContainer className="relative min-h-screen">
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitchButton />
      </div>

      <div className="w-full lg:hidden space-y-8 flex flex-col items-center justify-center min-h-screen max-w-[700px] mx-auto">
        <SlideIn direction="up" className="px-6">
          <div className="w-full flex flex-col text-center gap-3.5">
            <h1 className="text-(--neutral-800) font-medium text-[26px] dark:text-white heading-font">
              Let's Get Started 😁
            </h1>
            <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
              Sign up or login into to have a full digital experience in our
              restaurant
            </p>
          </div>
        </SlideIn>

        <div className="w-full px-6 mt-14">
          <FadeIn className="w-full space-y-3">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="py-4 bg-(--purple-2) rounded-2xl text-white font-semibold text-base w-full"
            >
              Get started
            </motion.button>
            <div className="w-full flex items-center justify-between gap-6">
              <div className="h-0.5 bg-(--neutral-200) w-1/2"></div>
              <span className="text-(--neutral-400)">OR</span>
              <div className="h-0.5 bg-(--neutral-200) w-1/2"></div>
            </div>
            <button className="px-6 py-4 bg-white shadow-sm rounded-2xl w-full flex items-center justify-center gap-2">
              <img src="/images/facebook-icon.svg" alt="Social Icon" className="w-5 h-5"/> <span className="font-semibold text-base text-(--purple-2)">Continue with Facebook</span>
            </button>
            <button className="px-6 py-4 bg-white shadow-sm rounded-2xl w-full flex items-center justify-center gap-2"><img src="/images/google-icon.svg" alt="Social Icon" className="w-5 h-5"/> <span className="font-semibold text-base text-(--purple-2)">Continue with Gmail</span></button>
          </FadeIn>
        </div>

        <button className="px-6 py-4 text-(--purple-3) font-semibold tex-base mt-[145px]">Sign up later</button>
      </div>

      <div className="hidden lg:flex w-full min-h-screen p-[30px]">
        <div className="flex-1 min-h-full flex flex-col items-center justify-center gap-[42px]">
          <SlideIn
            direction="up"
            className="space-y-4 text-center w-full max-w-[480px]"
          >
            <h1 className="font-medium text-[40px] text-(--neutral-800) heading-font dark:text-white">
              Let's Get Started 😁
            </h1>
            <p className="font-medium text-(--neutral-600) text-base dark:text-(--neutral-150)">
              Sign up or Login to have a full digital experience in our
              restaurant
            </p>
          </SlideIn>

          <FadeIn className="flex flex-col gap-4 w-full max-w-[480px]">
            <motion.button
              className="px-6 py-4 bg-(--purple-2) rounded-2xl font-semibold text-base text-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-6 py-4 text-(--purple-2) font-semibold text-base cursor-pointer dark:text-(--purple-5)"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign up Later
            </motion.button>
          </FadeIn>
        </div>

        <div className="bg-white dark:bg-(--neutral-700) flex-1 min-h-full rounded-3xl flex flex-col align-center justify-center">
          <PopIn>
            <div className="w-full max-w-[500px] mx-auto">
              <img
                src="/images/desktop-onboarding-illustration.svg"
                alt="Onboarding Illustration"
                className="w-full"
              />
            </div>
          </PopIn>

          <div className="space-y-6">
            <FadeIn className="px-6 mt-[42px]">
              <div className="w-full flex justify-center">
                <div className="w-full h-1.5 bg-(--light-progress-bg) dark:bg-(--neutral-800) max-w-[140px] rounded-2xl mx-auto flex flex-row overflow-hidden">
                  <div className="w-1/3 relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={animateBar ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 3.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="absolute left-0 top-0 h-full w-full bg-[#FFB01D] rounded-2xl"
                    />
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex-1"></div>
                </div>
              </div>
            </FadeIn>

            <SlideIn direction="up" className="text-center space-y-3.5">
              <h2 className="font-medium text-3xl text-(--neutral-700) dark:text-white heading-font">
                Full Contactless Experience
              </h2>
              <p className="font-medium text-base text-(--neutral-500) dark:text-(-neutral-150)">
                From ordering to paying, that's all contactless
              </p>
            </SlideIn>

            <FadeIn className="font-medium text-[26px] text-center">
              <p>
                <span className="text-(--neutral-700) dark:text-white">
                  Eat
                </span>
                <span className="text-(--orange-1)">Easy</span>
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </MotionContainer>
  );
}

export default SignUpMethod;
