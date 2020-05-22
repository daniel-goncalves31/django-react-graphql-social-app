import React from "react";
import { TiTimes } from "react-icons/ti";
import {
  Chat as ChatType,
  useSelectedChatsContext,
} from "../../../context/SelectedChatsContext";
import { getImageUrl } from "../../../utils/getImageUrl";

interface Props {
  chat: ChatType;
}

const ChatHeader: React.FC<Props> = ({ chat }) => {
  const { addChat, removeChat } = useSelectedChatsContext();
  const { user } = chat;
  const photo = getImageUrl(user.photo, "photo");
  return (
    <div className=" h-full flex items-center justify-between bg-indigo-400 rounded-t-md cursor-pointer hover:bg-indigo-600 shadow">
      <div
        className="flex flex-grow space-x-2 pl-2 py-1 items-center"
        onClick={() => addChat(user)}
      >
        <img
          src={photo}
          alt="user"
          className="h-6 w-6 rounded-full object-cover object-center"
        />
        <p className="text-xs font-bold text-white">{user.name}</p>
      </div>
      <TiTimes
        className="w-5 h-5 mr-2 cursor-pointer text-gray-100 z-50"
        onClick={() => removeChat(user)}
      />
    </div>
  );
};

export default ChatHeader;
