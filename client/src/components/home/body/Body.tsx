import React from "react";
import Avatar from "./Avatar";
import Feed from "./content/Feed";
import NavigationMenu from "./navigation-menu/NavigationMenu";
import SideMenu from "./side-menu/SideMenu";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <div className="relative bg-white">
      <div className="absolute flex w-full" style={{ top: "-5rem" }}>
        <Avatar />
        <NavigationMenu />
      </div>
      <div className="flex w-full h-56">
        <div className="h-full w-2/12 p-2">
          <SideMenu />
        </div>
        <div className="h-full w-7/12 px-2 my-5">
          <Feed />
        </div>
        <div className="h-full w-3/12 p-2"></div>
      </div>
    </div>
  );
};

export default Body;
