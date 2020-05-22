import React from "react";
import { useSelectedChatsContext } from "../../../context/SelectedChatsContext";
import Chat from "./Chat";

interface Props {}

const ChatsContainer: React.FC<Props> = () => {
  const { selectedChats } = useSelectedChatsContext();
  return (
    <div className="fixed bottom-0 left-0 w-full z-20">
      <div className="relative w-full flex flex-row-reverse items-baseline flex-no-wrap h-8 px-2">
        {selectedChats.map((chat) => (
          <Chat key={chat.user.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatsContainer;
