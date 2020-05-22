import React, { useContext, useState } from "react";
import { UserType } from "../graphql/generated";

export interface Chat {
  user: UserType;
  active: boolean;
}

interface Context {
  selectedChats: Chat[];
  addChat: (user: UserType) => void;
  removeChat: (user: UserType) => void;
}

const SelectedChatsContext = React.createContext<Context>({
  selectedChats: [],
  addChat: () => {},
  removeChat: () => {},
});

const useSelectedChatsContext = () => useContext(SelectedChatsContext);

const SelectedChatsProvider: React.FC = ({ children }) => {
  const [selectedChats, setSelectedChats] = useState<Chat[]>([]);

  const addChat = (user: UserType) => {
    const existingChatIndex = selectedChats.findIndex(
      (chat) => chat.user.id === user.id
    );

    // Chat already exist
    if (existingChatIndex > -1) {
      const chats = selectedChats;
      chats[existingChatIndex].active = !chats[existingChatIndex].active;
      setSelectedChats([...chats]);
    } else {
      setSelectedChats((prevChats) => [...prevChats, { user, active: true }]);
    }
  };

  const removeChat = (user: UserType) => {
    const chats = selectedChats.filter((chat) => chat.user.id !== user.id);
    setSelectedChats([...chats]);
  };

  return (
    <SelectedChatsContext.Provider
      value={{ selectedChats, addChat, removeChat }}
    >
      {children}
    </SelectedChatsContext.Provider>
  );
};

export { useSelectedChatsContext, SelectedChatsProvider };
