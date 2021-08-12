import React from "react";

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

const RedirectBtn = ({ Style, redirect, text }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={Style}
        onPress={() => {
          navigation.navigate(redirect);
        }}
      >
        <Text style={styles.linkSignIn}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RedirectBtn;

const styles = StyleSheet.create({
  linkSignIn: {
    color: "#717171",
  },
});
