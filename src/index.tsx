import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const client = new ApolloClient({
//   uri: "https://graphql.bitquery.io",
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "https://graphql.bitquery.io",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = "BQYd1ev9RPQuIIektluqqkJzdSJZv3AM";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "BQYd1ev9RPQuIIektluqqkJzdSJZv3AM",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
