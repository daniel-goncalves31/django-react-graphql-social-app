import React from "react";
import { useUserContext } from "../../../../context/UserContext";
import { getImageUrl } from "../../../../utils/getImageUrl";

interface Props {}

const FriendsListItem: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const { firstName, lastName, photo } = currentUser!;
  const image = getImageUrl(photo, "photo");
  return (
    <div className="p-2 flex hover:bg-gray-100 cursor-pointer">
      <img
        src={image}
        alt="user"
        className="w-10 h-10 rounded-full object-center object-cover"
      />
      <div className="ml-2">
        <h1 className="text-xs text-gray-800 font-bold">{`${firstName} ${lastName}`}</h1>
      </div>
    </div>
  );
};

export default FriendsListItem;
