import { FaArrowLeft } from "react-icons/fa";
import { useState, useRef } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { MotionContainer, PopIn, SlideIn } from "../animations/motion";
import ThemeSwitchButton from "../ThemeSwitchButton";

const VerifyCode = () => {
  const { state } = useLocation();
  const gmail = state?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const getOutlineStyle = (i: number): React.CSSProperties | undefined => {
    if (focusedIndex !== i) return undefined;
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const varName = isDark ? "--purple-2" : "--purple-5";
    return { outline: `2px solid var(${varName})`, outlineOffset: "2px" };
  };

  const confirmCode = () => {
    if (digits.some((d) => d === "")) {
      setError("Please enter the full 4-digit code.");
      const firstEmpty = digits.findIndex((d) => d === "");
      if (firstEmpty >= 0) inputsRef.current[firstEmpty]?.focus();
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Clear inputs after successful submission
      setDigits(Array(4).fill(""));
      setFocusedIndex(-1);
      // also blur any focused input
      inputsRef.current.forEach((el) => el && el.blur());
    }, 2000);
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
    // focus next empty or last
    const nextEmpty = digits.findIndex((d, i) => i >= idx && d === "");
    if (nextEmpty >= 0) inputsRef.current[nextEmpty]?.focus();
    else inputsRef.current[focusIndex]?.focus();
  };

  return (
    <MotionContainer className="w-full px-6 py-[15px] relative min-h-screen">
      <button
        className="px-3 py-3 rounded-2xl bg-white shadow-md max-w-11 dark:bg-(--neutral-700)"
        onClick={() => navigate(-1) || navigate("/signup")}
      >
        <FaArrowLeft className="dark:text-white" />
      </button>

      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitchButton />
      </div>

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
        Didn't receive a code?{" "}
        <button className="font-bold text-(--yellow-1) cusor-pointer">
          Resend Code
        </button>
      </p>
      <SlideIn
        className="absolute left-0 bottom-[15px] w-full text-center px-6"
        direction="up"
      >
        <div>
          <button
            className="px-6 py-4 bg-(--purple-2) text-white rounded-2xl w-full cursor-pointer font-semibold text-base"
            onClick={() => confirmCode()}
          >
            {loading ? <ClipLoader color="white" size={18} /> : "Next"}
          </button>
        </div>
      </SlideIn>
    </MotionContainer>
  );
};

export default VerifyCode;
