import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import MainRouter from "./MainRouter";
import "./tailwind.generated.css";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <UserProvider>
        <MainRouter />
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </>
  );
};

export default App;
