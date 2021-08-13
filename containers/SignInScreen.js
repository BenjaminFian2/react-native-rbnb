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
import ErrorMessage from "../components/ErrorMessage";
import ConnectBtn from "../components/ConnectBtn";
import RedirectBtn from "../components/RedirectBtn";

const SignInScreen = ({ navigation, setToken, setId }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        const userToken = response.data.token;
        const id = response.data.id;
        setIsLoading(false);
        setToken(userToken);
        setId(id);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("an error accurred");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Logo Style={styles.logo} />
        <Title value="Sign in" Style={styles.title} />
        <Input
          placeholder="email"
          keyboardType="email-address"
          autoCapitalize="none"
          secureEntryToggle={false}
          changeFunc={setEmail}
        />
        <Input
          placeholder="password"
          keyboardType="default"
          autoCapitalize="none"
          secureEntryToggle={!showPassword}
          changeFunc={setPassword}
          passShow={showPassword}
          passFunc={setShowPassword}
        />
        <ErrorMessage Style={styles.error} text={errorMessage} />
        <ActivityIndicator size="small" color="#0000ff" animating={isLoading} />
        <ConnectBtn disabled={isLoading} submit={handleSubmit} text="Sign in" />
        <RedirectBtn
          Style={styles.linkSignUp}
          redirect="SignUp"
          text="No account ? Register"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? constants.statusBarHeight : 0,
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
  },

  logo: {
    marginTop: 75,
    height: 100,
    width: 100,
  },

  title: {
    marginTop: 30,
    marginBottom: 100,
  },

  error: {
    marginTop: 100,
    marginBottom: 10,
  },

  linkSignUp: {
    marginTop: 15,
  },
});
