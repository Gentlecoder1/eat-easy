import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ThemeSwitchButton from "../ThemeSwitchButton";
import { useNavigate } from "react-router-dom";

function SignUpMethod() {
  const [animateBar, setAnimateBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setAnimateBar(true), []);

  return (
    <MotionContainer className="relative min-h-screen">
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitchButton />
      </div>

      <div className="w-full lg:hidden space-y-8 flex flex-col items-center justify-center min-h-screen max-w-[700px] mx-auto relative">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/signup")}
              className="py-4 bg-(--purple-2) rounded-2xl text-white font-semibold text-base w-full cursor-pointer"
            >
              Get started
            </motion.button>

            <div className="w-full flex items-center justify-between gap-6">
              <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
              <span className="text-(--neutral-400) dark:text-(--purple-4)">
                OR
              </span>
              <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
            </div>

            <PopIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-white dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) shadow-sm rounded-2xl w-full flex items-center justify-center gap-2"
              >
                <img
                  src="/images/facebook-icon.svg"
                  alt="Social Icon"
                  className="w-5 h-5"
                />
                <span className="font-semibold text-base text-(--purple-2) dark:text-(--purple-5)">
                  Continue with Facebook
                </span>
              </motion.button>
            </PopIn>

            <PopIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-white dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) shadow-sm rounded-2xl w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <img
                  src="/images/google-icon.svg"
                  alt="Social Icon"
                  className="w-5 h-5"
                />
                <span className="font-semibold text-base text-(--purple-2) dark:text-(--purple-5)">
                  Continue with Gmail
                </span>
              </motion.button>
            </PopIn>
          </FadeIn>
        </div>

        <PopIn>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-4 text-(--purple-3) font-semibold tex-base mt-[145px] dark:text-(--purple-5)"
          >
            Sign up later
          </motion.button>
        </PopIn>
      </div>

      <div className="hidden lg:flex w-full min-h-screen p-[30px]">
        <MotionContainer className="flex-1 min-h-full flex flex-col items-center justify-center gap-[42px]">
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
          <FadeIn className="w-full flex-col space-y-4 max-w-[480px] mx-auto justify-center">
            <PopIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/signup")}
                className="w-full px-6 py-4 bg-(--purple-2) rounded-2xl text-white cursor-pointer"
              >
                Get Started
              </motion.button>
            </PopIn>

            <div className="w-full flex items-center justify-between gap-6">
              <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
              <span className="text-(--neutral-400) dark:text-(--purple-4)">
                OR
              </span>
              <div className="h-0.5 bg-(--neutral-200) w-1/2 dark:bg-(--neutral-600)"></div>
            </div>

            <PopIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-white border border-(--neutral-500) dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) rounded-2xl w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <img
                  src="/images/facebook-icon.svg"
                  alt="Social Icon"
                  className="w-5 h-5"
                />
                <span className="font-semibold text-base text-(--neutral-500) dark:text-(--purple-5)">
                  Continue with Facebook
                </span>
              </motion.button>
            </PopIn>

            <PopIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-white border border-(--neutral-500) dark:bg-(--neutral-800) dark:border dark:border-(--purple-3) rounded-2xl w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <img
                  src="/images/google-icon.svg"
                  alt="Social Icon"
                  className="w-5 h-5"
                />
                <span className="font-semibold text-base text-(--neutral-500) dark:text-(--purple-5)">
                  Continue with Gmail
                </span>
              </motion.button>
            </PopIn>
          </FadeIn>

          <PopIn>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative -bottom-[150px] px-6 py-4 text-(--purple-2) font-semibold text-base dark:text-(--purple-5) cursor-pointer"
            >
              Sign up later
            </motion.button>
          </PopIn>
        </MotionContainer>

        <MotionContainer className="bg-white dark:bg-(--neutral-700) flex-1 min-h-full rounded-3xl flex flex-col align-center justify-center">
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
        </MotionContainer>
      </div>
    </MotionContainer>
  );
}

export default SignUpMethod;
