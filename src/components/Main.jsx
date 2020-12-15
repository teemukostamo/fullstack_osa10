import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  NativeRouter as Router,
} from "react-router-native";
import * as Linking from "expo-linking";

import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";

import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import CreateReview from "./CreateReview";
import Button from "./Button";

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

  if (id === "sign-in") {
    return <SignIn />;
  } else {
    const { repository } = useRepository(id);
    const { reviews } = useReviews(id);
    const openUrl = () => {
      Linking.openURL(repository.url);
    };
    if (!repository) {
      return null;
    }

    return (
      <View style={{ paddingBottom: 14, backgroundColor: "white" }}>
        <RepositoryItem repository={repository} reviews={reviews} />
        <Button onPress={openUrl} style={{ marginLeft: 10, marginRight: 10 }}>
          Open In Github
        </Button>
      </View>
    );
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
          <Route path='/create-review' exact>
            <CreateReview />
          </Route>

          <Route path='/:id'>
            <SingleRepository />
          </Route>

          <Route path='/sign-in' exact>
            <SignIn />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </View>
  );
};

export default Main;
