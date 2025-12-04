import { FaArrowLeft } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";
import { MotionContainer, PopIn, SlideIn, FadeIn } from "../animations/motion";
import ThemeSwitchButton from "../ThemeSwitchButton";

const VerifyCode = () => {
  const { state } = useLocation();
  const [animateBar, setAnimateBar] = useState(false);
  const gmail = state?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => setAnimateBar(true), []);

  useEffect(() => {
    if (gmail && expiresAt == null) {
      const expiryMs = Date.now() + 10 * 60 * 1000;
      setExpiresAt(expiryMs);
    }
  }, [gmail, expiresAt]);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  const getOutlineStyle = (i: number): React.CSSProperties | undefined => {
    if (focusedIndex !== i) return undefined;
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const varName = isDark ? "--purple-2" : "--purple-5";
    return { outline: `2px solid var(${varName})`, outlineOffset: "2px" };
  };

  const confirmCode = async () => {
    if (digits.some((d) => d === "")) {
      setError("Please enter the full 4-digit code.");
      const firstEmpty = digits.findIndex((d) => d === "");
      if (firstEmpty >= 0) inputsRef.current[firstEmpty]?.focus();
      return;
    }
    const entered = digits.join("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gmail, code: entered }),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) throw new Error("Verification failed");
      if (!contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      const data = await res.json();
      if (!data?.success) {
        throw new Error(data?.message || "Invalid code");
      }
      setDigits(Array(4).fill(""));
      setFocusedIndex(-1);
      inputsRef.current.forEach((el) => el && el.blur());
      navigate("/welcome");
    } catch (e) {
      setError("Incorrect or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const resendCode = async () => {
    if (!gmail) return;
    setResendLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gmail }),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) throw new Error("Failed to resend code");
      if (!contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      await res.json();
      // Reset expiry and input UX regardless of payload
      const expiryMs = Date.now() + 10 * 60 * 1000; // reset 10 minutes
      setExpiresAt(expiryMs);
      setDigits(Array(4).fill(""));
      inputsRef.current[0]?.focus();
    } catch (e) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <MotionContainer className="w-full">
      <div className="w-full px-6 p-[30px] min-h-screen lg:flex">
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
                <h1 className="flex items-center heading-font font-medium text-[22px] justify-center text-(--neutral-800) dark:text-white">
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
              <p className="text-center mt-[22px] font-semibold text-base text-(--neutral-500) dark:text-white">
                {expiresAt == null ? (
                  <span>Enter the code to continue.</span>
                ) : timeLeft > 0 ? (
                  <span>
                    Code expires in {Math.floor(timeLeft / 60)}m {timeLeft % 60}
                    s
                  </span>
                ) : (
                  <span className="text-red-500">
                    Code expired. Please resend.
                  </span>
                )}
              </p>
              <p className="text-center mt-2 font-semibold text-base text-(--neutral-500) dark:text-white">
                Didn't receive a code?{" "}
                <button
                  className="font-bold text-(--yellow-1) cursor-pointer disabled:opacity-60"
                  disabled={resendLoading}
                  onClick={resendCode}
                >
                  {resendLoading ? "Resending..." : "Resend Code"}
                </button>
              </p>
            </div>
            <SlideIn className="w-full text-center mt-[318px]" direction="up">
              <div>
                <button
                  className="px-6 py-4 bg-(--purple-2) text-white rounded-2xl w-full cursor-pointer font-semibold text-base"
                  onClick={() => confirmCode()}
                >
                  {loading ? <ClipLoader color="white" size={18} /> : "Next"}
                </button>
              </div>
            </SlideIn>
          </div>
        </div>

        <div className="bg-white dark:bg-(--neutral-700) flex-1 min-h-full rounded-3xl flex-col align-center justify-center hidden lg:flex">
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
};

export default VerifyCode;
