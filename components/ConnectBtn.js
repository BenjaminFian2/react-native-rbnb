import React from "react";

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const ConnectBtn = ({ disabled, submit, text, Style }) => {
  return (
    <View>
      <TouchableOpacity
        style={[Style, styles.btn]}
        disabled={disabled}
        onPress={() => {
          submit();
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectBtn;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    borderWidth: 3,
    borderColor: "#F9585D",
    borderRadius: 30,
  },

  text: {
    fontSize: 20,
    color: "#717171",
  },
});
