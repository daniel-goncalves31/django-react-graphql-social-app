import React from "react";
import { NotificationProvider } from "../../context/NotificationContext";
import { SelectedChatsProvider } from "../../context/SelectedChatsContext";
import Body from "./body/Body";
import ChatsContainer from "./chats/ChatsContainer";
import Header from "./header/Header";
import "./styles.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <SelectedChatsProvider>
        <NotificationProvider>
          <Body />
          <ChatsContainer />
        </NotificationProvider>
      </SelectedChatsProvider>
    </>
  );
};

export default Home;
