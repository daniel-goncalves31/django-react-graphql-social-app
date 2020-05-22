import React from "react";
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
        <Body />
        <ChatsContainer />
      </SelectedChatsProvider>
    </>
  );
};

export default Home;
