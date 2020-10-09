import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
// import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingBottom: 10,
    flexDirection: 'row',
  },
});

const AppBarRepoTab = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <Link to='/' component={TouchableHighlight} activeOpacity={0.8}>
            <Text
              style={{
                paddingLeft: 15,
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
              }}
              // fontWeight='bold'
              // fontSize='subheading'
              // color='textSecondary'
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10
              }}
              // fontWeight='bold'
              // fontSize='subheading'
              // color='textSecondary'
            >
              Sign in
            </Text>
          </Link>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBarRepoTab;
