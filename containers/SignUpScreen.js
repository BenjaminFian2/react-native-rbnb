import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

//imports components
import Logo from "../components/Logo";
import Title from "../components/Title";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import ErrorMessage from "../components/ErrorMessage";
import ConnectBtn from "../components/ConnectBtn";
import RedirectBtn from "../components/RedirectBtn";

const SignuUpScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !username || !description || !password || !passwordConfirm) {
      setErrorMessage("Please fill all fields");
    } else {
      if (password !== passwordConfirm) {
        setErrorMessage("Passwords must be the same");
      } else {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          const userToken = response.data.token;
          setIsLoading(false);
          setToken(userToken);
        } catch (error) {
          if (error.response) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("an error accurred");
          }
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <Logo Style={styles.logo} />
        <Title value="Sign up" Style={styles.title} />
        <Input
          placeholder="email"
          keyboardType="email-address"
          autoCapitalize="none"
          secureEntryToggle={false}
          changeFunc={setEmail}
        />
        <Input
          placeholder="username"
          keyboardType="default"
          autoCapitalize="characters"
          secureEntryToggle={false}
          changeFunc={setUsername}
        />
        <TextArea
          placeholder="Describe yourself in a few words..."
          changeFunc={setDescription}
        />
        <Input
          placeholder="password"
          keyboardType="default"
          autoCapitalize="none"
          secureEntryToggle={!showPassword1}
          changeFunc={setPassword}
          passShow={showPassword1}
          passFunc={setShowPassword1}
        />
        <Input
          placeholder="confirm password"
          keyboardType="default"
          autoCapitalize="none"
          secureEntryToggle={!showPassword2}
          changeFunc={setPasswordConfirm}
          passShow={showPassword2}
          passFunc={setShowPassword2}
        />
        <ErrorMessage Style={styles.error} text={errorMessage} />
        <ActivityIndicator size="small" color="#0000ff" animating={isLoading} />
        <ConnectBtn disabled={isLoading} submit={handleSubmit} text="Sign up" />
        <RedirectBtn
          Style={styles.linkSignIn}
          redirect="SignIn"
          text="Already have an account? Sign in"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignuUpScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? constants.statusBarHeight : 0,
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
  },

  logo: {
    marginTop: 20,
    height: 100,
    width: 100,
  },

  title: {
    marginTop: 30,
    marginBottom: 15,
  },

  error: {
    marginTop: 20,
    marginBottom: 10,
  },

  linkSignIn: {
    marginTop: 15,
  },
});
