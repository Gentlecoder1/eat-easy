import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="w-full">
      <div className="w-full md:hidden">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
