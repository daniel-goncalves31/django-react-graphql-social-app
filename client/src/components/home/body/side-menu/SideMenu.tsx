import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FiHeart, FiUsers } from "react-icons/fi";
import { MdRssFeed } from "react-icons/md";
import SideMenuItem from "./SideMenuItem";
interface Props {}

const SideMenu: React.FC<Props> = () => {
  return (
    <div className="mt-20 bg-gray-100 shadow rounded">
      <SideMenuItem Icon={MdRssFeed}>Activities</SideMenuItem>
      <SideMenuItem Icon={FiUsers}>Friends</SideMenuItem>
      <SideMenuItem Icon={FiHeart}>You Liked</SideMenuItem>
      <SideMenuItem Icon={FaRegCommentDots}>Your Comments</SideMenuItem>
    </div>
  );
};

export default SideMenu;
