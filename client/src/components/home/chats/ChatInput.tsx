import React from "react";

interface Props {}

const ChatInput: React.FC<Props> = () => {
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder="Say something..."
        className="inline-block p-2 w-full text-xs rounded-full bg-gray-200"
      />
    </div>
  );
};

export default ChatInput;
