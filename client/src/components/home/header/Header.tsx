import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { getImageUrl } from "../../../utils/getImageUrl";
import Navbar from "./navbar/Navbar";

interface Props {}

const Header: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const image = getImageUrl(currentUser?.backImage, "back image");
  return (
    <>
      <Navbar />
      <img
        className="w-full h-48 object-cover object-center flex"
        src={image}
        alt="background"
        style={{ filter: "brightness(0.8)" }}
      />
    </>
  );
};

export default Header;
