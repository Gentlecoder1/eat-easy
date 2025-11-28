import SignUpMobile from "./SignUpMobile";
import SignUpDesktop from "./SignUpDesktop";
import ThemeSwitchButton from "../ThemeSwitchButton";

function SignUp() {
  return (
    <div className="w-full">
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitchButton />
      </div>

      <SignUpMobile />
      <SignUpDesktop />
    </div>
  );
}

export default SignUp;
