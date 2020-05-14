import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default Router;
