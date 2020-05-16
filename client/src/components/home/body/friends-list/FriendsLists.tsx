import React from "react";
import { GoSearch } from "react-icons/go";
import FriendsListItem from "./FriendsListItem";
interface Props {}

const FriendsList: React.FC<Props> = () => {
  return (
    <div className="bg-white rounded shadow-lg">
      <div className="flex items-center text-sm text-gray-400 p-2">
        <GoSearch className="mr-2" />
        <input
          type="text"
          className="outline-none py-2 text-gray-700"
          placeholder="search friend..."
        />
      </div>
      <hr />
      <div className="mt-2">
        <FriendsListItem />
        <FriendsListItem />
        <FriendsListItem />
        <FriendsListItem />
      </div>
    </div>
  );
};

export default FriendsList;
