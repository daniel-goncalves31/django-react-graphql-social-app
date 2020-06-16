import React from "react";
import { IconType } from "react-icons/lib/cjs";

interface Props {
  Icon: IconType;
  count?: number | null;
}

const SideMenuItem: React.FC<Props> = ({ Icon, children, count }) => {
  return (
    <div className="py-3 px-3 flex justify-between items-center text-xs cursor-pointer hover:bg-gray-200">
      <div className="text-gray-500 flex items-center">
        <Icon className="mr-1" />
        {children}
      </div>
      <span className="bg-green-400 text-white text-xs rounded-full px-1">
        {count || "0"}
      </span>
    </div>
  );
};

export default SideMenuItem;
