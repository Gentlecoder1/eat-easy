import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas/SignupSchema";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import {
  MotionContainer,
  fadeIn,
  popIn,
  PopIn,
  SlideIn,
  FadeIn,
} from "../animations/motion";
import { z } from "zod";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function SignUpDesktop() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    reset,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateBar, setAnimateBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setAnimateBar(true), []);

  const handleSignup = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, username: data.username }),
      });
      const contentType = res.headers.get("content-type") || "";
      let json: any = null;
      if (contentType.includes("application/json")) {
        try {
          json = await res.json();
        } catch (_) {
          throw new Error("Unexpected empty response from server");
        }
      } else {
        const text = await res.text();
        throw new Error(text || "Server returned non-JSON response");
      }
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "Failed to send code");
      }
      reset({ username: "", email: "", phoneNumber: undefined, password: "" });
      setShowPassword(false);
      navigate("/verify-code", { state: { email: data.email } });
    } catch (e) {
      console.error(e);
      alert("Could not send verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="hidden lg:flex w-full min-h-screen p-[30px]">
        <div className="w-full flex-1 min-h-full">
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="w-full max-w-[480px] mx-auto min-h-full flex flex-col items-center justify-center"
          >
            <motion.div
              variants={popIn}
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full text-center px-6 space-y-3.5"
            >
              <h1 className="text-(--neutral-800) dark:text-white font-medium text-[22px] lg:text-[40px] heading-font">
                Getting Started ✌{" "}
              </h1>
              <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
                Looks like you're new to us! Create an account for a complete
                experience.
              </p>
            </motion.div>

            <MotionContainer className="flex flex-col w-full mt-[42px] px-6 gap-6">
              <motion.div variants={fadeIn}>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    {...register("username", {
                      onChange: () => clearErrors("username"),
                    })}
                    className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-400">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    {...register("email", {
                      onChange: () => clearErrors("email"),
                    })}
                    className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <div className="flex flex-col gap-2">
                  <Controller
                    name="phoneNumber"
                    defaultValue={undefined}
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        international
                        defaultCountry="NG"
                        placeholder="Phone Number"
                        onChange={(value) => {
                          field.onChange(value);
                          clearErrors("phoneNumber");
                        }}
                        className="phone-input"
                      />
                    )}
                  />

                  {errors.phoneNumber && (
                    <p className="text-sm text-red-400">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <div className="flex flex-col gap-2">
                  <div className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) flex items-center justify-between dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        onChange: () => clearErrors("password"),
                      })}
                      className="outline-none w-full"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="ml-2"
                    >
                      {showPassword ? (
                        <IoEyeOutline size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </motion.div>
            </MotionContainer>

            <motion.div
              variants={popIn}
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative -bottom-[150px] px-6 py-4 text-(--purple-2) font-semibold text-base dark:text-(--purple-5) cursor-pointer w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white oultine-none border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <ClipLoader color="white" size={19} /> : "Next"}
              </motion.button>
            </motion.div>
          </form>
        </div>

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
    </div>
  );
}

export default SignUpDesktop;
