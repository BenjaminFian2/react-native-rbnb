import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

const SignuInScreen = ({ navigation, setToken }) => {
  const [inputs, setInputs] = useState(["", ""]);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState([false, false]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (inputs[0] === "" || inputs[1] === "") {
      setErrorMessage("Please fill all fields");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: inputs[0],
            password: inputs[1],
          }
        );
        const userToken = response.data.token;
        setIsLoading(false);
        setToken(userToken);
      } catch (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <KeyboardAwareScrollView>
        <View style={styles.scrollContainer}>
          <Image
            source={require("../assets/logo-rbnb.png")}
            style={styles.logo}
            resizeMode="contain"
          ></Image>
          <Text style={styles.title}>Sign in</Text>
          <TextInput
            textContentType="emailAddress"
            style={styles.input}
            onChangeText={(text) => {
              const tab = [...inputs];
              tab[0] = text;
              setInputs(tab);
            }}
            placeholder="email"
          ></TextInput>

          <View style={{ position: "relative" }}>
            <TextInput
              secureTextEntry={showPassword[0] ? false : true}
              style={styles.input}
              onChangeText={(text) => {
                const tab = [...inputs];
                tab[1] = text;
                setInputs(tab);
              }}
              placeholder="password"
            ></TextInput>
            <Entypo
              name={showPassword[0] ? "eye-with-line" : "eye"}
              size={25}
              color="grey"
              style={{ position: "absolute", bottom: 20, right: 0 }}
              onPress={() => {
                const tab = [...showPassword];
                tab[0] = !tab[0];
                setShowPassword(tab);
              }}
            />
          </View>

          <TextInput style={styles.error} value={errorMessage} />
          <ActivityIndicator
            size="small"
            color="#0000ff"
            animating={isLoading}
          />
          <TouchableOpacity
            disabled={isLoading}
            style={styles.btnSignIn}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.textSignIn}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.linkSignUp}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignuInScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? constants.statusBarHeight : 0,
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
    color: "#717171",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 100,
  },

  input: {
    height: 40,
    width: 300,
    fontSize: 16,
    paddingVertical: 10,
    marginVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#FFC8CD",
  },

  error: {
    fontSize: 15,
    marginTop: 100,
    marginBottom: 10,
    color: "#FA6C70",
  },

  btnSignIn: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    borderWidth: 3,
    borderColor: "#F9585D",
    borderRadius: 30,
  },

  textSignIn: {
    fontSize: 20,
    color: "#717171",
  },

  linkSignUp: {
    marginTop: 15,
    color: "#717171",
  },
});
