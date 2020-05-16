import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { getImageUrl } from "../../../utils/getImageUrl";

interface Props {}

const Avatar: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const image = getImageUrl(currentUser?.photo, "photo");

  return (
    <div className="w-2/12 flex justify-center">
      <img
        className="h-40 w-40 rounded-full shadow object-center object-cover border-2 border-gray-300"
        src={image}
        alt="user"
      />
    </div>
  );
};

export default Avatar;
