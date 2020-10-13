import React, { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import SignInForm from "./SignInForm";
import { useApolloClient } from "@apollo/client";
import useSignIn from "../hooks/useSignIn";
import AuthStorageContext from "../contexts/AuthStorageContext";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [signIn] = useSignIn();
  const apolloClient = useApolloClient();
  let history = useHistory();

  // const tryLogin = async () => {
  //   const token = await authStorage.getAccessToken();
  //   console.log(token);
  // };

  // tryLogin();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
