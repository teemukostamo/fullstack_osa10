import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    margin: 4,
    height: 50,
    paddingLeft: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});

const errorStyles = StyleSheet.create({
  textInput: {
    height: 50,
    margin: 4,
    paddingLeft: 6,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
  },
});

const TextInput = ({ error, ...props }) => {
  // const textInputStyle = [style];
  // console.log(textInputStyle);

  let finalStyle = error ? errorStyles.textInput : styles.textInput;

  return <NativeTextInput value={props.value} style={finalStyle} {...props} />;
};

export default TextInput;
