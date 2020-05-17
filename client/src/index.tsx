import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  link: createUploadLink({
    uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
