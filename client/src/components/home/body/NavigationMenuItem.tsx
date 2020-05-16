import React from "react";
import { IconType } from "react-icons/lib/cjs";
import { NavLink } from "react-router-dom";

interface Props {
  Icon: IconType;
  path: string;
}

const NavigationMenuItem: React.FC<Props> = ({ children, Icon, path }) => {
  return (
    <li>
      <NavLink
        className="flex items-center py-2 px-4 text-gray-200 rounded-sm cursor-pointer text-xs hover:bg-white hover:text-gray-600"
        to={path}
        style={{ lineHeight: "1px" }}
      >
        <Icon className="h-4 w-4 mr-3" />
        {children}
        <span className="bg-red-400 rounded-full p-3 tracking-wide ml-3 h-1 w-1 flex justify-center items-center text-white">
          {5}
        </span>
      </NavLink>
    </li>
  );
};

export default NavigationMenuItem;
