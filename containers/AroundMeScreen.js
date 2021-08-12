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
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          console.log("granted");
          const location = await Location.getCurrentPositionAsync();
          setPosition([location.coords.latitude, location.coords.longitude]);

          const response = await axios.get(
            ` https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${position[0]}&longitude=${position[1]}`
          );
          setData(response.data);
        } else {
          console.log("denied");
          const response = await axios.get(
            ` https://express-airbnb-api.herokuapp.com/rooms/around`
          );
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  const coords = () => {
    const tab = [];
    for (let i = 0; i < data.length; i++) {
      tab.push({ localisation: data[i].location, id: data[i]._id });
    }
    return tab;
  };

  if (!isLoading) {
    console.log(coords());
  }

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {coords().map((item, index) => {
          console.log(item.id);
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.localisation[1],
                longitude: item.localisation[0],
              }}
              key={item.id}
              onPress={() => {
                navigation.navigate("Room", { id: item.id });
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
