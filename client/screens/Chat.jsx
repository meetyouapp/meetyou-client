import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  FlatList,
  CardItem,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import ListChat from "../components/ListChat";

export default function Chat({ navigation }) {
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("access_token").then((value) => console.log(value));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <ScrollView>
        <ListChat />
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
});
