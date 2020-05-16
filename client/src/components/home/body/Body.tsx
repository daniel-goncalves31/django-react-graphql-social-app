import React from "react";
import Avatar from "./Avatar";
import NavigationMenu from "./NavigationMenu";

interface Props {}

const Body: React.FC<Props> = () => {
  return (
    <div className="relative bg-white h-56">
      <div className="absolute px-8 flex" style={{ top: "-4rem" }}>
        <Avatar />
        <NavigationMenu />
      </div>
    </div>
  );
};

export default Body;
