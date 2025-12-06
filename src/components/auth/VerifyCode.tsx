import { FaArrowLeft } from "react-icons/fa";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MotionContainer, PopIn, SlideIn } from "../animations/motion";
import ThemeSwitchButton from "../ThemeSwitchButton";
import AsideCard from "../AsideCard";

const VerifyCode = () => {
  const { state } = useLocation();
  const gmail = state?.email as string | undefined;
  const username = state?.username as string | undefined;
  const phoneNumber = state?.phoneNumber as string | undefined;
  const password = state?.password as string | undefined;

  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);

  const getOutlineStyle = (i: number): React.CSSProperties | undefined => {
    if (focusedIndex !== i) return undefined;
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const varName = isDark ? "--purple-2" : "--purple-5";
    return { outline: `2px solid var(${varName})`, outlineOffset: "2px" };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const raw = e.target.value || "";
    const lastDigit = raw.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const copy = [...prev];
      copy[idx] = lastDigit;
      return copy;
    });
    if (lastDigit && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        setDigits((prev) => {
          const copy = [...prev];
          copy[idx] = "";
          return copy;
        });
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setDigits((prev) => {
          const copy = [...prev];
          copy[idx - 1] = "";
          return copy;
        });
      }
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const pasteDigits = paste.split("");
    setDigits((prev) => {
      const copy = [...prev];
      for (let i = 0; i < pasteDigits.length && idx + i < copy.length; i++) {
        copy[idx + i] = pasteDigits[i];
      }
      return copy;
    });
    const focusIndex = Math.min(3, idx + pasteDigits.length);
    const nextEmpty = digits.findIndex((d, i) => i >= idx && d === "");
    if (nextEmpty >= 0) inputsRef.current[nextEmpty]?.focus();
    else inputsRef.current[focusIndex]?.focus();
  };

  const [submitting, setSubmitting] = useState(false);

  const handleNext = async () => {
    const firstEmpty = digits.findIndex((d) => d === "");
    if (firstEmpty !== -1) {
      setError("Please enter the full 4-digit code.");
      inputsRef.current[firstEmpty]?.focus();
      return;
    }
    if (!gmail) {
      setError("Missing email context. Please go back and try again.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const code = digits.join("");
      // Verify OTP with server
      const resp = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gmail, code, }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.error || "Verification failed");
      }

      // On success, create Supabase user and profile
      if (!password) throw new Error("Missing password from signup step");

      const { submitProfile, createProfile } = await import(
        "../../services/userProfile"
      );
      const signUpResult = await submitProfile({
        email: gmail,
        password,
        username: username ?? "",
        phone_number: phoneNumber ?? "",
      });
      const userId = signUpResult?.user?.id;
      if (userId) {
        await createProfile(
          {
            username: username ?? "",
            email: gmail,
            phone_number: phoneNumber ?? "",
          },
          userId
        );
      }

      navigate("/welcome");
    } catch (e: any) {
      setError(e?.message || "Verification failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MotionContainer className="w-full">
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="w-full px-6  py-4 min-h-screen lg:flex">
          <button
            className="px-3 py-3 rounded-2xl bg-white shadow-md max-w-11 dark:bg-(--neutral-700) lg:hidden"
            onClick={() => navigate(-1) || navigate("/signup")}
          >
            <FaArrowLeft className="dark:text-white" />
          </button>

          <div className="absolute top-6 right-6 z-50">
            <ThemeSwitchButton />
          </div>

          <div className="lg:flex-1 min-h-full relative lg:flex lg:flex-col lg:justify-center">
            <div className="w-full lg:max-w-[480px] mx-auto">
              <div>
                <PopIn className="mt-3 text-center space-y-3.5">
                  <h1 className="flex items-center heading-font font-medium text-[22px] lg:text-[40px] heading-font justify-center text-(--neutral-800) dark:text-white">
                    <span>Verify Code </span>
                    <RxLightningBolt color="yellow" />{" "}
                  </h1>
                  <p className="font-medium text-base text-(--neutral-600) dark:text-(--neutral-150)">
                    We just send a 4-digit verification code to{" "}
                    <span className="font-bold text-(--neutral-700) dark:text-(--neutral-150)">
                      {gmail}
                    </span>
                    . Enter the code in the box below to continue.
                  </p>
                </PopIn>
                <div className="mt-10 flex items-center justify-center gap-[29px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <PopIn
                      key={i}
                      className="w-[54px] h-[54px] text-center flex items-center justify-center rounded-2xl bg-white border border-(--neutral-150) dark:border-(--neutral-600) dark:bg-(--dark-mode-input-bg)"
                      style={getOutlineStyle(i)}
                    >
                      <input
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        maxLength={1}
                        value={digits[i]}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => setFocusedIndex(-1)}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={(e) => handlePaste(e, i)}
                        placeholder="-"
                        className="w-full h-full flex items-center justify-center text-center border-none outline-none dark:text-white font-normal text-xl"
                        aria-label={`digit-${i + 1}`}
                      />
                    </PopIn>
                  ))}
                </div>

                {error && (
                  <p className="text-center mt-3 font-semibold text-sm text-red-500">
                    {error}
                  </p>
                )}

                <p className="text-center mt-3 lg:mt-[42px] font-semibold text-base text-(--neutral-500) dark:text-white">
                  Didn't receive a code?{" "}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-bold text-(--yellow-1) cursor-pointer disabled:opacity-60"
                  >
                    Resend Code
                  </motion.button>
                </p>
              </div>
              <SlideIn
                className="w-full flex items-center gap-6 text-center mt-[318px]"
                direction="up"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-white) bg-white dark:bg-(--neutral-700) dark:text-white rounded-2xl w-full max-w-[123px] cursor-pointer font-semibold text-base hidden lg:flex items-center gap-2 flex-1 text-(--purple-2)"
                  onClick={() => navigate(-1) || navigate("/signup")}
                >
                  <FaArrowLeft /> <span>Back</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-(--purple-2) text-white rounded-2xl w-full cursor-pointer font-semibold text-base flex-2 disabled:opacity-60"
                  onClick={handleNext}
                  disabled={submitting}
                >
                  {submitting ? "Verifying..." : "Next"}
                </motion.button>
              </SlideIn>
            </div>
          </div>
        </div>
        <AsideCard />
      </div>
    </MotionContainer>
  );
};

export default VerifyCode;
