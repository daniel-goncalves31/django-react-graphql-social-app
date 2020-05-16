import React from "react";
import Body from "./body/Body";
import Header from "./header/Header";
import "./styles.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Home;
