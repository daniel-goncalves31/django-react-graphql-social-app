import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

interface Props {
  component: any;
  exact?: boolean;
  path: string;
}

const AuthRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
  const { isAuthenticated } = useUserContext();

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthRoute;
