import { MotionContainer, PopIn, FadeIn, SlideIn } from "./animations/motion";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

function GetStarted() {
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => setAnimateBar(true), []);

  return (
    <MotionContainer className="w-full h-screen">
      <div className="w-full lg:hidden space-y-8 px-6 flex flex-col justify-center h-full">
        <PopIn>
          <div className="w-full overflow-hidden rounded-2xl shadow-sm">
            <img
              src="/images/mobile-onboarding-illustration.svg"
              alt="Illustration"
              className="w-full block"
            />
          </div>
        </PopIn>

        <FadeIn>
          <div className="w-full flex justify-center">
            <div className="w-full h-1.5 bg-(--bar-bg) max-w-[140px] rounded-2xl mx-auto flex flex-row overflow-hidden">
              <div className="w-1/3 relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={animateBar ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 2.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute left-0 top-0 h-full w-full bg-[#FFB01D] rounded-2xl"
                />
              </div>
              <div className="flex-1"></div>
              <div className="flex-1"></div>
            </div>
          </div>
        </FadeIn>

        <SlideIn direction="up">
          <div className="w-full flex flex-col text-center gap-3.5">
            <h1 className="text-(--neutral-800) font-medium text-[26px]">
              Full contactless experience
            </h1>
            <p className="font-medium text-base text-(--neutral-600) px-8">
              From ordering to paying, that's all contactless
            </p>
          </div>
        </SlideIn>

        <FadeIn>
          <div className="w-full flex flex-col gap-2.5">
            <button className="font-semibold text-base text-(--purple-3) py-4">
              Sign up Later
            </button>
            <button className="py-4 bg-(--purple-2) rounded-2xl text-white font-semibold text-base shadow-lg transform hover:-translate-y-0.5 transition">
              Get started
            </button>
          </div>
        </FadeIn>
      </div>
    </MotionContainer>
  );
}

export default GetStarted;
