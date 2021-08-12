import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DescriptionArticle = ({ title, ratingValue, reviews, imgUserUrl }) => {
  const reviewsClient = (num) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= num) {
        stars.push(
          <Ionicons name="ios-star" size={20} color="#FFB100" key={i} />
        );
      } else {
        stars.push(
          <Ionicons name="ios-star" size={20} color="#BBBBBB" key={i} />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.descriptionContainer}>
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.reviewsContainer}>
          <View style={styles.starContainer}>{reviewsClient(ratingValue)}</View>
          <Text style={styles.numberReviews}>{reviews} reviews</Text>
        </View>
      </View>
      <View style={styles.imageUserContainer}>
        <Image source={{ uri: imgUserUrl }} style={styles.imageUser} />
      </View>
    </View>
  );
};

export default DescriptionArticle;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },

  title: {
    fontSize: 22,
  },

  descriptionContainer: {
    // width: "75%",
    justifyContent: "space-around",
    flex: 1,
  },

  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  starContainer: { flexDirection: "row", marginRight: 5 },

  star: { marginRight: 5 },

  numberReviews: {
    fontSize: 16,
    color: "#bbbbbb",
  },

  imageUserContainer: {
    marginLeft: 8,
  },

  imageUser: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
