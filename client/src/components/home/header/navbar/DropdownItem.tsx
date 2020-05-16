import React from "react";
import { IconType } from "react-icons/lib/cjs";

interface Props {
  Icon: IconType;
  onClick?: any;
}

const DropdownItem: React.FC<Props> = ({ children, Icon, onClick }) => {
  return (
    <li
      className="hover:bg-gray-100 cursor-pointer py-3 px-2 flex items-center"
      onClick={onClick}
    >
      <Icon className="h-4 w-4 mr-2" />
      {children}
    </li>
  );
};

export default DropdownItem;
