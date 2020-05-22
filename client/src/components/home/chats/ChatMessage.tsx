import React from "react";

interface Props {}

const ChatMessage: React.FC<Props> = () => {
  return (
    <div
      className="p-2 mt-2 rounded-lg bg-indigo-400 text-gray-100 text-xs"
      style={{ width: "fit-content" }}
    >
      <p>Lorem ipsum dolor, sit amet</p>
    </div>
  );
};

export default ChatMessage;
