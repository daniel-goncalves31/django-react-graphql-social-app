import React from "react";
import { PostProvider } from "../../../context/PostContext";
import Avatar from "./Avatar";
import FriendsList from "./friends-list/FriendsLists";
import NavigationMenu from "./navigation-menu/NavigationMenu";
import SecondaryRouter from "./SecondaryRouter";
import SideMenu from "./side-menu/SideMenu";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <div className="relative bg-gray-100" id="app-body">
      <div className="absolute flex w-full" style={{ top: "-5rem" }}>
        <Avatar />
        <NavigationMenu />
      </div>
      <div className="flex w-full">
        <div className="h-full w-2/12 p-2">
          <SideMenu />
        </div>
        <div className="h-full w-8/12 mx-6 px-4 py-2 rounded shadow-lg bg-white my-5 z-10">
          <PostProvider>
            <SecondaryRouter />
          </PostProvider>
        </div>
        <div className="h-full w-2/12 my-5 mx-2 z-10">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default Body;
