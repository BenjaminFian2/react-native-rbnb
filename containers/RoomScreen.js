import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import ImageArticle from "../components/ImageArticle";
import DescriptionArticle from "../components/DescriptionArticle";

const RoomScreen = ({ navigation, route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [toogleText, setToogleText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [route.params.id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageArticle
          Style={styles.image}
          imageUrl={data.photos[0].url}
          price={data.price}
        />
        <View style={styles.infosContainer}>
          <DescriptionArticle
            title={data.title}
            ratingValue={data.ratingValue}
            reviews={data.reviews}
            imgUserUrl={data.user.account.photo.url}
          />
          <Text
            numberOfLines={!toogleText ? 3 : null}
            style={styles.description}
            onPress={() => {
              setToogleText(!toogleText);
            }}
          >
            {data.description}
          </Text>
        </View>
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContainer: {
    alignItems: "center",
  },

  image: {
    height: 280,
    width: Dimensions.get("window").width,
  },

  infosContainer: {
    width: "90%",
  },

  description: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },

  map: {
    width: Dimensions.get("window").width,
    height: 260,
  },
});
