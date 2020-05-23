import React, { useEffect } from "react";
import { Chat as ChatType } from "../../../context/SelectedChatsContext";
import {
  OnNewMessageDocument,
  useChatMessageQuery,
} from "../../../graphql/generated";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

interface Props {
  chat: ChatType;
}

const Chat: React.FC<Props> = ({ chat }) => {
  const { data, loading, error, subscribeToMore } = useChatMessageQuery({
    variables: { userId: chat.user.id },
  });

  useEffect(() => {
    const unsubscribeToLess = subscribeToMore({
      onError: (e) => console.error(e.message),
      document: OnNewMessageDocument,
      variables: { chatId: data?.chatMessages?.id || "nope" },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          chatMessages: {
            ...prev.chatMessages,
            messages: [
              ...prev!.chatMessages?.messages!,
              (subscriptionData.data as any).onNewMessage,
            ],
          },
        } as any;
      },
    });

    return function unsubscribe() {
      if (unsubscribeToLess) {
        unsubscribeToLess();
      }
    };
  }, [subscribeToMore, data]);

  if (error) {
    console.error(error.message);
    return <p>Error</p>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
        <ChatList messages={data?.chatMessages?.messages as any} />
        <ChatInput chatId={data?.chatMessages?.id!} />
      </div>
    </div>
  );
};

export default Chat;
