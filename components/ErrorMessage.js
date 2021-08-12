import React from "react";

import { Text, StyleSheet, View } from "react-native";

const ErrorMessage = ({ Style, text }) => {
  return (
    <View>
      <Text style={[Style, styles.error]}>{text}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    fontSize: 15,
    color: "#FA6C70",
  },
});
