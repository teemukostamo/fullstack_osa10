import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  txtBtn: {
    backgroundColor: '#0366d6',
    padding: 14,
    color: 'white',
    textAlign: 'center',
    margin: 1,
    borderRadius: 5,
    fontWeight: 'bold',
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <FormikTextInput
        name='username'
        placeholder=' Username'
      />
      <FormikTextInput
        name='password'
        placeholder=' Password'
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View>
          <Text style={styles.txtBtn}>Sign in</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignInForm;
