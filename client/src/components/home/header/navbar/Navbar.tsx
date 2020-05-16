import React from "react";
import Dropdown from "./Dropdown";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <nav className="navbar w-full px-12 py-2 bg-purple-400 flex justify-between items-center">
      <span className="text-white text-xl font-bold">Social Network</span>
      <Dropdown />
    </nav>
  );
};

export default Navbar;
