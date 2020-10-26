import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  NativeRouter as Router,
} from "react-router-native";
import useRepository from "../hooks/useRepository";

import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import AppBar from "./AppBar";
import SignIn from "./SignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});
const SingleRepository = () => {
  let { id } = useParams();
  console.log(id);
  if (id === "sign-in") {
    return <SignIn />;
  } else {
    const { repository } = useRepository(id);
    if (!repository) {
      return null;
    }
    return <RepositoryItem repository={repository} />;
  }
};

const Main = () => {
  return (
    <View style={styles.container}>
      <Router>
        <AppBar />
        <Switch>
          <Route path='/' exact>
            <RepositoryList />
          </Route>

          <Route path='/:id'>
            <SingleRepository />
          </Route>

          {/* <Route path='/sign-in' exact>
            <SignIn />
          </Route> */}
          <Redirect to='/' />
        </Switch>
      </Router>
    </View>
  );
};

export default Main;
