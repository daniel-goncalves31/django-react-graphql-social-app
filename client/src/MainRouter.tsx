import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/home/Home";
import AuthRoute from "./components/shared/AuthRoute";
import PrivateRoute from "./components/shared/PrivateRoute";

interface Props {}

const MainRouter: React.FC<Props> = () => {
  return (
    <Switch>
      <PrivateRoute path="/home" component={Home} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={SignUp} />
      <Redirect from="/" to="/home/feed" exact />
    </Switch>
  );
};

export default MainRouter;
