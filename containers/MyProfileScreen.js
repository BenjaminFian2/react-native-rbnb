import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  View,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Input from "../components/Input";
import TextArea from "../components/TextArea";
import ErrorMessage from "../components/ErrorMessage";
import ConnectBtn from "../components/ConnectBtn";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";

const MyProfileScreen = ({ setToken, userToken, setId, userId }) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setPhoto(response.data.photo[0].url);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [reload]);

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setPhoto(result.uri);
      } else {
        alert("No picture selected");
      }
    } else {
      alert("Permission denied");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setPhoto(result.uri);
      } else {
        alert("No photo was taken");
      }
    } else {
      alert("Permission denied");
    }
  };

  const logOut = () => {
    setToken(null);
    setId(null);
  };

  const update = async () => {
    if (!email || !username || !description) {
      setErrorMessage("Please fill all fields");
    } else {
      try {
        setIsLoading(true);
        const tab = photo.split(".");
        const extension = tab[tab.length - 1];
        const formData = new FormData();
        if (photo) {
          formData.append("photo", {
            uri: photo,
            name: `${username}-pic.${extension}`,
            type: `image/${extension}`,
          });

          await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData,
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
        }
        await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          { email: email, description: description, username: username },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        setIsLoading(false);
        setReload(!reload);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("an error accurred");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.ContainLogo}>
          <View style={styles.logo}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.image} />
            ) : (
              <FontAwesome5 name="user-alt" size={90} color="#E7E7E7" />
            )}
          </View>
          <View style={styles.iconesPhotos}>
            <MaterialCommunityIcons
              name="image-multiple"
              size={35}
              color="#717171"
              onPress={() => {
                getPermissionAndGetPicture();
              }}
            />
            <MaterialIcons
              name="photo-camera"
              size={35}
              color="#717171"
              onPress={() => {
                getPermissionAndTakePicture();
              }}
            />
          </View>
        </View>
        <Input
          defaultValue={email}
          keyboardType="email-address"
          autoCapitalize="none"
          secureEntryToggle={false}
          changeFunc={setEmail}
        />
        <Input
          defaultValue={username}
          keyboardType="default"
          autoCapitalize="characters"
          secureEntryToggle={false}
          changeFunc={setUsername}
        />
        <TextArea defaultValue={description} changeFunc={setDescription} />
        <ErrorMessage Style={styles.error} text={errorMessage} />
        <ActivityIndicator size="small" color="#0000ff" animating={isLoading} />
        <ConnectBtn disabled={isLoading} submit={update} text="Update" />
        <ConnectBtn
          Style={{ marginTop: 20, backgroundColor: "#E7E7E7" }}
          submit={logOut}
          text="Log out"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    alignItems: "center",
  },

  ContainLogo: {
    flexDirection: "row",
    marginTop: 20,
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFC0C5",
    borderWidth: 2,
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },

  iconesPhotos: {
    justifyContent: "space-around",
    marginLeft: 20,
  },

  error: {
    marginTop: 20,
    marginBottom: 10,
  },
});
