import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useUserContext } from "../../../../context/UserContext";
import { useLogoutMutation } from "../../../../graphql/generated";
import { handleErrors } from "../../../../utils/error_handler";
import { getImageUrl } from "../../../../utils/getImageUrl";
import DropdownItem from "./DropdownItem";

interface Props {}

const Dropdown: React.FC<Props> = () => {
  // User data
  const { currentUser, setCurrentUser } = useUserContext();
  const image = getImageUrl(currentUser?.photo, "photo");

  // log out mutation
  const [logout] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      const { data } = await logout();
      if (data && data.logout && data.logout.deleted) {
        setCurrentUser(null);
        toast.success("Log out successfully");
      } else {
        toast.error("Somethind went wrong!!!");
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div className="dropdown relative text-xs text-gray-700 hover:bg-white rounded p-2 z-10">
      <div className="flex items-center space-x-2">
        <img
          src={image}
          alt="user"
          className="h-8 w-8 rounded-full object-center object-cover border-2 border-gray-300"
        />
        <span className="font-medium cursor-default">{currentUser?.name}</span>
        <RiArrowDropDownLine className="h-6 w-6" />
      </div>
      <ul className="dropdown-menu absolute left-0 rounded shadow w-full overflow-hidden bg-white">
        <DropdownItem Icon={AiOutlineUser}>My Account</DropdownItem>
        <DropdownItem Icon={FaCogs}>Settings</DropdownItem>
        <DropdownItem Icon={BsPower} onClick={handleLogOut}>
          Log Out
        </DropdownItem>
      </ul>
    </div>
  );
};

export default Dropdown;
