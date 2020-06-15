import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreatePost from "./content/CreatePost";
import Feed from "./content/feed/Feed";
import Notifications from "./content/notifications/Notifications";

interface Props {}

const SecondaryRouter: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/home/feed" component={Feed} />
      <Route path="/home/notifications" component={Notifications} />
      <Route path="/home/create-post" component={CreatePost} />
      <Redirect from="/home" to="/home/feed" exact />
    </Switch>
  );
};

export default SecondaryRouter;
