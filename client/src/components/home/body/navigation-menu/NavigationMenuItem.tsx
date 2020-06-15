import React from "react";
import { IconType } from "react-icons/lib/cjs";
import { NavLink } from "react-router-dom";

interface Props {
  Icon: IconType;
  path: string;
  count?: number;
}

const NavigationMenuItem: React.FC<Props> = ({
  children,
  Icon,
  path,
  count,
}) => {
  return (
    <li>
      <NavLink
        exact
        className="flex items-center py-1 px-4 text-gray-200 rounded-t-sm cursor-pointer text-xs hover:bg-gray-100 hover:text-gray-600"
        to={path}
        style={{ lineHeight: "1px" }}
      >
        <Icon className="h-4 w-4 mr-3" />
        {children}
        {count !== undefined && (
          <span className="bg-red-400 rounded-full p-2 tracking-wide ml-3 h-1 w-1 flex justify-center items-center text-white">
            {count}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default NavigationMenuItem;
