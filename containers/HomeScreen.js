import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import Article from "../components/Article";

import LottieView from "lottie-react-native";

const HomeScreen = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
  ) : (
    // <LottieView
    //   ref={(animation) => {
    //     this.animation = animation;
    //   }}
    //   style={{
    //     width: 400,
    //     height: 400,
    //     backgroundColor: "#eee",
    //   }}
    //   source={require("../assets/home-lottie.json")}
    // OR find more Lottie files @ https://lottiefiles.com/featured
    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
    // />
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Article item={item} />;
        }}
        keyExtractor={(item) => item._id}
        style={styles.containerList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  containerList: {
    width: "90%",
  },
});
