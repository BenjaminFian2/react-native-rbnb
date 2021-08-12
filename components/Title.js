import React from "react";

import { Text, StyleSheet } from "react-native";

const Title = ({ value, Style }) => {
  return <Text style={[styles.title, Style]}>{value}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#717171",
    fontSize: 30,
    fontWeight: "bold",
  },
});
