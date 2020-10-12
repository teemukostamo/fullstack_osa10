import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import SignInForm from "./SignInForm";

import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [signIn, data] = useSignIn();
  console.log(data);
  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    try {
      await signIn({ username, password });
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
