import React from "react";

import { TextInput, StyleSheet, View } from "react-native";

const TextArea = ({ placeholder, defaultValue, changeFunc }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        multiline={true}
        numberOfLines={5}
        style={styles.textArea}
        onChangeText={(text) => {
          changeFunc(text);
        }}
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textArea: {
    height: 100,
    width: 300,
    flexShrink: 1,
    fontSize: 16,
    padding: 10,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#FFC8CD",
    textAlignVertical: "top",
  },
});
