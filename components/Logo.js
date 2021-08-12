import React from "react";
import { Image } from "react-native";

const Logo = ({ Style }) => {
  return (
    <Image
      source={require("../assets/logo-rbnb.png")}
      resizeMode="contain"
      style={Style}
    />
  );
};

export default Logo;
