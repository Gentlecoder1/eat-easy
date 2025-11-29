import { FaArrowLeft } from "react-icons/fa";
import { RxLightningBolt } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const VerifyCode = () => {
  const {state} = useLocation();
  const gmail = state?.email;
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-[15px] relative min-h-screen">
      <button className="px-3 py-[13px] rounded-2xl bg-white shadow-md max-w-11" onClick={()=> navigate(-1) || navigate("/signup")}>
        <FaArrowLeft />
      </button>
      <div className="mt-3 text-center space-y-3.5">
        <h1 className="flex items-center heading-font font-medium text-[22px] justify-center text-(--neutral-800)">
          <span>Verify Code </span>
          <RxLightningBolt color="yellow" />{" "}
        </h1>
        <p className="font-medium text-base text-(--neutral-600)">
          We just send a 4-digit verification code to{" "}
          <span className="font-bold text-(--neutral-700)">{gmail}</span>. Enter
          the code in the box below to continue.
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-[29px]">
        {
          Array.from({length: 4}).map((_, i)=> (
            <div key={i} className="w-[54px] h-[54px] text-center flex items-center justify-center rounded-2xl bg-white border border-(--neutral-150)">
              <input type="number" placeholder="1" className="w-full h-full flex items-center justify-center text-center border-none outline-none" max={1}/>
            </div>
          ))
        }
      </div>
      <p className="text-center mt-[22px] font-semibold text-base text-(--neutral-500)">
        Didn't receive a code? <span className="font-bold text-(--yellow-1)">Resend Code</span>
      </p>
      <div className="absolute left-0 bottom-[15px] w-full text-center px-6">
        <button className="px-6 py-4 bg-(--purple-2) text-white rounded-2xl w-full">Next</button>
      </div>
    </div>
  );
};

export default VerifyCode;
