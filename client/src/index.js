import { ApolloClient } from "apollo-client";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import { typeDefs } from "./apollo-client/client-schema";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './assets/auto-complete.css'

const { useState } = require("react");
const { useEffect } = require("react");
const { gql } = require("apollo-boost");
const HttpLink = require("apollo-link-http").HttpLink;
const inMemoryCache = require("apollo-cache-inmemory").InMemoryCache;

const resolvers = {
  Query: {
    async anyState(parent, args, { cache }, info) {
      const queryResult = await cache.readQuery({
        query: gql`
          query getState {
            state @client
          }
        `,
      });
      return queryResult;
    },
  },
  Mutation: {
    async loginWarning(parent, args, { cache }, info) {
      cache.writeData({ data: { loginWarning: args.bool } });

      return args.bool;
    },

    async isLoggedInMutation(parent, args, { cache }, info) {
      const res = await cache.readQuery({
        query: gql`
          query isLoggedIn {
            isLoggedIn @client
          }
        `,
      });

      let bool = res.isLoggedIn;
      if (bool) {
        bool = false;
      } else {
        bool = true;
      }
      console.log(`running mutation, changing to ${bool}`);
      await cache.writeData({ data: { isLoggedIn: bool } });
    },
  },
};

const init = async () => {
  const ApolloApp = () => {
    const [client, setClient] = useState(undefined);

    useEffect(async () => {
      const cache = new inMemoryCache();
      const link = new HttpLink({
        uri: "http://localhost:4000",
      });

      const client = new ApolloClient({
        cache,
        link,
        typeDefs,
        resolvers,
      });

      setClient(client);
    }, []);

    if (client === undefined) return <div>Loading...</div>;

    return (
      <Router basename={'/'}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </Provider>
      </Router>
    );
  };

  ReactDOM.render(<ApolloApp />, document.getElementById("root"));
};

init();
