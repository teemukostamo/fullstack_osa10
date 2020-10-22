import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";
import { AUTHORIZED_USER } from "../graphql/queries";
import Constants from "expo-constants";
import AuthStorageContext from "../contexts/AuthStorageContext";

import AppBarTab from "./AppBarTab";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: "row",
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "white",
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const { data } = useQuery(AUTHORIZED_USER);
  const authorizedUser = data ? data.authorizedUser : undefined;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <Link to='/' component={AppBarTab}>
          Repositories
        </Link>
        {authorizedUser ? (
          <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
        ) : (
          <Link to='/sign-in' component={AppBarTab}>
            Sign in
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
