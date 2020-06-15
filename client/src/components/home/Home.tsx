import React from "react";
import { NotificationProvider } from "../../context/NotificationContext";
import { PostProvider } from "../../context/PostContext";
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
        <PostProvider>
          <NotificationProvider>
            <Body />
            <ChatsContainer />
          </NotificationProvider>
        </PostProvider>
      </SelectedChatsProvider>
    </>
  );
};

export default Home;
