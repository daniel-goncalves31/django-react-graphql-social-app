import React from "react";
import { GoSearch } from "react-icons/go";
import { useAllUsersContext } from "../../../../context/AllUsersContext";
import FriendsListItem from "./FriendsListItem";
interface Props {}

const FriendsList: React.FC<Props> = () => {
  const { allUsers } = useAllUsersContext();
  return (
    <div className="bg-white rounded shadow-lg">
      <div className="flex items-center text-sm text-gray-400 p-2">
        <GoSearch className="mr-2" />
        <input
          type="text"
          className="w-full py-2 outline-none text-gray-700"
          placeholder="search friend..."
        />
      </div>
      <hr />
      <div className="mt-2">
        {allUsers?.map((user) => (
          <FriendsListItem key={user?.id} user={user as any} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
