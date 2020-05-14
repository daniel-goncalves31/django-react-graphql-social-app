import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import Router from "./Router";
import "./tailwind.generated.css";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      <UserProvider>
        <Router />
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </>
  );
};

export default App;
