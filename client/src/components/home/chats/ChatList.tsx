import React from "react";
import ChatMessage from "./ChatMessage";

interface Props {}

const ChatList: React.FC<Props> = () => {
  return (
    <div className="flex-grow flex flex-col-reverse px-2 overflow-y-auto mt-1">
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </div>
  );
};

export default ChatList;
