import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { useChatMessageQuery } from "../../../graphql/generated";
import ChatMessage from "./ChatMessage";

interface Props {
  userId: string;
}

const ChatList: React.FC<Props> = ({ userId }) => {
  const { currentUser } = useUserContext();
  const { data, loading, error } = useChatMessageQuery({
    variables: { userId },
  });

  if (error) {
    console.error(error.message);
    return <p>Error</p>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex-grow flex flex-col-reverse px-2 overflow-y-auto mt-1">
      {data?.chatMessages?.map((message) => (
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
