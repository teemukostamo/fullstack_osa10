import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Switch } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackGround,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/' exact component={RepositoryList} />
        {/* <Redirect to='/' /> */}
        <Route path='/signin' component={SignIn} />
        {/* <Redirect to='/signin' /> */}
      </Switch>
    </View>
  );
};

export default Main;
