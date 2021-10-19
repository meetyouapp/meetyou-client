import React, { useLayoutEffect } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { componentsColor } from "../constants/Color";

import Profile from "./Profile";
import Explore from "./Explore";
import Chat from "./Chat";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginUsers, setTokenUsers } from "../stores/actions/userAction";

export default function TabScreen({ navigation }) {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();

  const signOut = async () => {
    await AsyncStorage.removeItem("access_token");
    dispatch(loginUsers(false));
    dispatch(setTokenUsers(""));
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "heart-circle" : "heart-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-list-circle" : "ios-list-circle-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }

          return <Ionicons name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: componentsColor,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 55 },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: componentsColor },
          headerShadowVisible: false,
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: { color: "#333" },
          headerTintColor: "#333",
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity activeOpacity={0.5}>
                  <Avatar
                    rounded
                    source={{
                      uri: "https://www.onelove.org/wp-content/uploads/2015/10/missingheadshot.jpg",
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                  <MaterialIcons
                    name="logout"
                    size={24}
                    color={componentsColor}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
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
