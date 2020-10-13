import React, { useContext } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import { useApolloClient } from "@apollo/client";

// import Text from './Text';
import { Link } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    paddingBottom: 10,
    flexDirection: "row",
  },
});

const AppBarRepoTab = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const { loading, data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  const logOutClick = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (loading) {
    return null;
  }

  if (!data.authorizedUser) {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView horizontal>
          <TouchableWithoutFeedback>
            <Link to='/' component={TouchableHighlight} activeOpacity={0.8}>
              <Text
                style={{
                  paddingLeft: 15,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Repositories
              </Text>
            </Link>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <Link to='/signin' component={TouchableOpacity} activeOpacity={0.8}>
              <Text
                style={{
                  paddingLeft: 15,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Sign in
              </Text>
            </Link>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView horizontal>
          <TouchableWithoutFeedback>
            <Link to='/' component={TouchableHighlight} activeOpacity={0.8}>
              <Text
                style={{
                  paddingLeft: 15,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Repositories
              </Text>
            </Link>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={logOutClick}>
            <Text
              style={{
                paddingLeft: 15,
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Sign out
            </Text>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default AppBarRepoTab;
