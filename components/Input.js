import React from "react";

import { TextInput, StyleSheet, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

const Input = ({
  placeholder,
  keyboardType,
  autoCapitalize,
  secureEntryToggle,
  changeFunc,
  passShow,
  passFunc,
  defaultValue,
}) => {
  // console.log(secureEntryToggle);
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureEntryToggle}
        style={styles.input}
        onChangeText={(text) => {
          changeFunc(text);
        }}
      />
      {(passShow || secureEntryToggle) && (
        <Entypo
          name={passShow ? "eye-with-line" : "eye"}
          size={25}
          color="grey"
          style={styles.icon}
          onPress={() => {
            passFunc(!passShow);
          }}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    fontSize: 16,
    paddingVertical: 10,
    marginVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#FFC8CD",
  },

  icon: {
    position: "absolute",
    bottom: 20,
    right: 0,
  },
});
