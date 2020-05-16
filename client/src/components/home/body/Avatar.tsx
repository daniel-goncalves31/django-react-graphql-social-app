import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { getImageUrl } from "../../../utils/getImageUrl";

interface Props {}

const Avatar: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const image = getImageUrl(currentUser?.photo, "photo");

  return (
    <img
      className="h-32 w-32 rounded-full shadow object-center object-cover border-2 border-gray-300"
      src={image}
      alt="user"
    />
  );
};

export default Avatar;
