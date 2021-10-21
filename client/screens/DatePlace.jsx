import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  CardItem,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import GestureRecognizer from "react-native-swipe-gestures";
import { componentsColor } from "../constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Center } from "native-base";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceDataAsync } from "../stores/actions/placeAction";

export default function DatePlace({ navigation }) {
  const data = useSelector((state) => state?.placeState?.placeData);
  const loading = useSelector((state) => state.placeState.loadingPlace);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaceDataAsync());
  }, []);

  if (loading) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3" py="64">
          <LoadingSpinner color={componentsColor} />
        </Center>
      </NativeBaseProvider>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        {data?.map((place) => {
          return (
            <View key={place.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Place Detail", { url: place.url });
                }}
              >
                <Image
                  style={styles.placeImage}
                  source={{ uri: place.photo }}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.placeName}>{place.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: "5%",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  placeImage: {
    width: 300,
    height: 200,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  placeName: {
    fontSize: 18,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
