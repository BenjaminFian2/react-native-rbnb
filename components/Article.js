import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

//import Article components
import ImageArticle from "./ImageArticle";
import DescriptionArticle from "./DescriptionArticle";

//import navigation
import { useNavigation } from "@react-navigation/native";

const Article = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Room", { id: item._id });
      }}
    >
      <ImageArticle
        Style={styles.image}
        imageUrl={item.photos[0].url}
        price={item.price}
      />
      <DescriptionArticle
        title={item.title}
        ratingValue={item.ratingValue}
        reviews={item.reviews}
        imgUserUrl={item.user.account.photo.url}
      />
    </TouchableOpacity>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    flex: 1,
  },

  image: {
    height: 200,
    width: "100%",
    marginTop: 15,
  },
});
