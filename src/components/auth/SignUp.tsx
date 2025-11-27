import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas/SignupSchema";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MotionContainer, fadeIn, popIn } from "../animations/motion";
import { z } from "zod";
import { motion } from "motion/react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="w-full max-w-[700px] mx-auto"
    >
      <motion.div
        variants={popIn}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full text-center px-6 pt-[72px] space-y-3.5"
      >
        <h1 className="text-(--neutral-800) font-medium text-[22px] heading-font">
          Getting Started ✌{" "}
        </h1>
        <p className="neutral-600 font-medium text-base">
          Looks like you're new to us! Create an account for a complete
          experience.
        </p>
      </motion.div>

      <MotionContainer className="flex flex-col w-full mt-10 px-6 space-y-10">
        <motion.div variants={fadeIn}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              {...register("username", {
                onChange: () => clearErrors("username"),
              })}
              className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500)"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              {...register("email", { onChange: () => clearErrors("email") })}
              className="px-4 py-3 bg-white outline-none border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500)"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              {...register("phoneNumber", {
                onChange: () => clearErrors("phoneNumber"),
              })}
              placeholder="Phone Number"
              className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500)"
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
            <div className="outline-none px-4 py-3 bg-white border border-(--neutral-150) rounded-2xl font-semibold text-sm text-(--neutral-500) flex items-center justify-between">
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
              <p className="text-sm text-red-400">{errors.password.message}</p>
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
          className="w-full text-center px-6 py-4 rounded-2xl bg-(--purple-2) text-white oultine-none border-none"
        >
          Next
        </motion.button>
      </motion.div>
    </form>
  );
}

export default SignUp;
