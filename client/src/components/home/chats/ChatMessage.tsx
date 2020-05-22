import React from "react";
import { MessageType } from "../../../graphql/generated";

interface Props {
  message: MessageType;
  currentUserId: string;
}

const ChatMessage: React.FC<Props> = ({ message, currentUserId }) => {
  return (
    <div
      className={`${
        message.sender.id === currentUserId
          ? "self-end bg-gray-200 text-gray-900"
          : "bg-indigo-400"
      } p-2 mt-3 rounded-lg shadow text-gray-100 text-xs`}
      style={{ width: "fit-content", maxWidth: "80%" }}
    >
      <p>{message.text}</p>
    </div>
  );
};

export default ChatMessage;
