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
import GestureRecognizer from 'react-native-swipe-gestures';
import { componentsColor } from "../constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceDataAsync } from "../stores/actions/placeAction";

export default function DatePlace() {
  const data = useSelector(state => state.placeState.placeData)
  let dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchPlaceDataAsync())
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
      {data?.map((place) => {
        return (
          <Image
            style={styles.placeImage}
            source={{ uri: place.photo }}
            key={place.id}
          ></Image>
        );
      })}
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: "0%",
    height: "100%",
    width: '100%',
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginLeft: 20
  },
  placeImage: {
    width: 200,
    height:100,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10
  }
})
