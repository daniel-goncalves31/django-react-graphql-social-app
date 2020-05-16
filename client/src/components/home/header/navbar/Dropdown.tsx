import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useUserContext } from "../../../../context/UserContext";
import { getImageUrl } from "../../../../utils/getImageUrl";
import DropdownItem from "./DropdownItem";

interface Props {}

const Dropdown: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const image = getImageUrl(currentUser?.photo, "photo");
  return (
    <div className="dropdown relative text-xs text-gray-700 hover:bg-white rounded p-2 z-10">
      <div className="flex items-center space-x-2">
        <img
          src={image}
          alt="user"
          className="h-8 w-8 rounded-full object-center object-cover border-2 border-gray-300"
        />
        <span className="font-medium cursor-default">
          {currentUser?.firstName + " " + currentUser?.lastName}
        </span>
        <RiArrowDropDownLine className="h-6 w-6" />
      </div>
      <ul className="dropdown-menu absolute left-0 rounded shadow w-full overflow-hidden bg-white">
        <DropdownItem Icon={AiOutlineUser}>My Account</DropdownItem>
        <DropdownItem Icon={FaCogs}>Settings</DropdownItem>
        <DropdownItem Icon={BsPower}>Log Out</DropdownItem>
      </ul>
    </div>
  );
};

export default Dropdown;
