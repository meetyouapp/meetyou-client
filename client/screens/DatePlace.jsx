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

export default function DatePlace({navigation}) {
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
          <View>
          <TouchableOpacity
          key={place.id}
          onPress={() => {
            navigation.navigate('Place Detail', {url: place.url})
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
    marginTop: "5%",
    height: "100%",
    width: '100%',
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  placeImage: {
    width: 300,
    height:200,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  placeName: {
    fontSize: 18,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
