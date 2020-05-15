import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useUserContext } from "../../context/UserContext";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  return (
    <nav className="navbar w-full px-12 py-2 bg-purple-400 flex justify-between items-center">
      <span className="text-white text-xl font-bold">Social Network</span>
      <div className="dropdown relative text-xs text-gray-700 hover:bg-white rounded p-2">
        <div className="flex items-center space-x-2">
          <img
            src={
              process.env.REACT_APP_SERVER_URL +
              "/images/" +
              currentUser?.photo!
            }
            alt="user"
            className="h-8 w-8 rounded-full object-center object-cover border-2 border-gray-300"
          />
          <span className="font-medium cursor-default">
            {currentUser?.firstName + " " + currentUser?.lastName}
          </span>
          <RiArrowDropDownLine className="h-6 w-6" />
        </div>
        <ul className="dropdown-menu absolute left-0 rounded shadow w-full overflow-hidden bg-white">
          <li className="hover:bg-gray-100 cursor-pointer py-3 px-2 flex items-center">
            <AiOutlineUser className="h-4 w-4 mr-2" />
            My Account
          </li>
          <li className="hover:bg-gray-100 cursor-pointer py-3 px-2 flex items-center">
            <FaCogs className="h-4 w-4 mr-2" />
            Settings
          </li>
          <li className="hover:bg-gray-100 cursor-pointer py-3 px-2 flex items-center">
            <BsPower className="h-4 w-4 mr-2" />
            Log Out
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
