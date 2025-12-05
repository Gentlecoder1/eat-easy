import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas/SignupSchema";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MotionContainer, fadeIn, popIn } from "../animations/motion";
import { z } from "zod";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function SignUpMobile() {
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
  const navigate = useNavigate();

  const handleSignup = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          phoneNumber: data.phoneNumber,
          password: data.password,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "Failed to send code");
      }
      reset({ username: "", email: "", phoneNumber: undefined, password: "" });
      setShowPassword(false);
      navigate("/verify-code", { state: { email: data.email } });
    } catch (e) {
      console.error(e);
      const msg =
        e instanceof Error
          ? e.message
          : "Could not send verification code. Please try again.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="w-full max-w-[700px] mx-auto lg:hidden"
      >
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full text-center px-6 pt-[72px] space-y-3.5"
        >
          <h1 className="text-(--neutral-800) dark:text-white font-medium text-[22px] heading-font">
            Getting Started ✌{" "}
          </h1>
          <p className="text-(--neutral-600) dark:text-(--neutral-150) font-medium text-base">
            Looks like you're new to us! Create an account for a complete
            experience.
          </p>
        </motion.div>

        <MotionContainer className="flex flex-col w-full mt-10 px-6 gap-10">
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
                {...register("email", { onChange: () => clearErrors("email") })}
                className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) dark:border-(--neutral-600) dark:text-(--neutral-200) dark:bg-(--dark-mode-input-bg)"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
          className="w-full mt-[124px] px-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white oultine-none border-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <ClipLoader color="white" size={19} /> : "Next"}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}

export default SignUpMobile;
