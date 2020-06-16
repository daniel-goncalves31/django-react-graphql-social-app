import React from "react";
import { NotificationProvider } from "../../context/NotificationContext";
import { PostProvider } from "../../context/PostContext";
import { SelectedChatsProvider } from "../../context/SelectedChatsContext";
import { UserStatisticsProvider } from "../../context/UserStatistics";
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
        <UserStatisticsProvider>
          <PostProvider>
            <NotificationProvider>
              <Body />
              <ChatsContainer />
            </NotificationProvider>
          </PostProvider>
        </UserStatisticsProvider>
      </SelectedChatsProvider>
    </>
  );
};

export default Home;
