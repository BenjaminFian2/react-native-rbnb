import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ImageArticle = ({ Style, imageUrl, price }) => {
  return (
    <View>
      <Image
        source={{ uri: imageUrl }}
        style={Style}
        // resizeMode="cover"
      />
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price} €</Text>
      </View>
    </View>
  );
};

export default ImageArticle;

const styles = StyleSheet.create({
  priceContainer: {
    position: "absolute",
    backgroundColor: "black",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 12,
  },

  priceText: {
    color: "white",
    fontSize: 22,
  },

  // image: {
  //   width: "100%",
  // },
});
