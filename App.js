import React from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/react-hooks";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

const apolloClient = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
};

export default App;
