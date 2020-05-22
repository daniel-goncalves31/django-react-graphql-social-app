import React from "react";
import { Chat as ChatType } from "../../../context/SelectedChatsContext";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
interface Props {
  chat: ChatType;
}

const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <div
      className={`${
        chat.active ? "chat-active" : "w-48 h-full"
      } ml-2 shadow-xl rounded-lg`}
    >
      <ChatHeader chat={chat} />
      <div
        className="w-full flex flex-col bg-white"
        style={{ height: "22rem" }}
      >
        <ChatList />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
