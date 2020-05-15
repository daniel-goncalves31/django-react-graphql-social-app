import React from "react";
import { Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/home/Home";
import AuthRoute from "./components/utils/AuthRoute";
import PrivateRoute from "./components/utils/PrivateRoute";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={SignUp} />
    </Switch>
  );
};

export default Router;
