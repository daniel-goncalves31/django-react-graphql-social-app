import React from "react";
import { useSelectedChatsContext } from "../../../../context/SelectedChatsContext";
import { UserType } from "../../../../graphql/generated";
import { getImageUrl } from "../../../../utils/getImageUrl";

interface Props {
  user: UserType;
}

const FriendsListItem: React.FC<Props> = ({ user }) => {
  const image = getImageUrl(user.photo, "photo");
  const { addChat } = useSelectedChatsContext();
  return (
    <div
      className="p-2 flex hover:bg-gray-100 cursor-pointer"
      onClick={() => addChat(user)}
    >
      <img
        src={image}
        alt="user"
        className="w-10 h-10 rounded-full object-center object-cover"
      />
      <div className="ml-2">
        <h1 className="text-xs text-gray-800 font-bold">{user.name}</h1>
      </div>
    </div>
  );
};

export default FriendsListItem;
