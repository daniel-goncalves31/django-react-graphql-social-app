import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FiHeart, FiUsers } from "react-icons/fi";
import { MdRssFeed } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserStatisticsContext } from "../../../../context/UserStatistics";
import SideMenuItem from "./SideMenuItem";

interface Props {}

const SideMenu: React.FC<Props> = () => {
  const { userStatistics } = useUserStatisticsContext();
  const {
    commentsCount,
    postsCount,
    likesCount,
    friendsCount,
  } = userStatistics!;
  return (
    <>
      <div className="mt-20 bg-white shadow rounded">
        <SideMenuItem count={postsCount} Icon={MdRssFeed}>
          Activities
        </SideMenuItem>
        <SideMenuItem count={friendsCount} Icon={FiUsers}>
          Friends
        </SideMenuItem>
        <SideMenuItem count={likesCount} Icon={FiHeart}>
          You Liked
        </SideMenuItem>
        <SideMenuItem count={commentsCount} Icon={FaRegCommentDots}>
          Your Comments
        </SideMenuItem>
      </div>
      <Link
        to="create-post"
        className="block w-full text-center rounded-lg bg-green-400 uppercase text-sm mt-4 py-1 outline-none text-white shadow"
      >
        Add Post
      </Link>
    </>
  );
};

export default SideMenu;
