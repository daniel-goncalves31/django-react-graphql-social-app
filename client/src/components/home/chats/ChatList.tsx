import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { MessageType } from "../../../graphql/generated";
import ChatMessage from "./ChatMessage";

interface Props {
  messages: MessageType[];
}

const ChatList: React.FC<Props> = ({ messages }) => {
  const { currentUser } = useUserContext();

  return (
    <div className="flex-grow flex flex-col-reverse px-2 overflow-y-auto mt-1">
      {messages?.reverse().map((message) => (
        <ChatMessage
          key={message?.id}
          message={message as any}
          currentUserId={currentUser?.id!}
        />
      ))}
    </div>
  );
};

export default ChatList;
