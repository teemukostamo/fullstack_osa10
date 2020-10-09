import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTabRepoTab from './AppBarRepoTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 15,
    // color: 'white',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTabRepoTab />
    </View>
  );
};

export default AppBar;
