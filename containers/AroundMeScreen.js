import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const AroundMeScreen = ({ navigation, route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState([48.856614, 2.3522219]);

  useEffect(() => {
    const getPermissionLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setPosition([location.coords.latitude, location.coords.longitude]);

          response = await axios.get(
            ` https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            ` https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissionLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: position[0],
          longitude: position[1],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data.map((item, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
              key={item._id}
              onPress={() => {
                navigation.navigate("RoomScreen", { id: item._id });
              }}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
