import React, { useLayoutEffect, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers, setTokenUsers } from "../stores/actions/userAction";
// import { fetchUserProfile } from "../stores/actions/profileAction";

export default function TabScreen({ navigation }) {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();

  const signOut = async () => {
    await AsyncStorage.removeItem("access_token");
    dispatch(loginUsers(false));
    dispatch(setTokenUsers(""));
    navigation.replace("Login");
  };

  return (
    <Tab.Navigator
      initialRouteName="Explore"
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
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: componentsColor },
          headerShadowVisible: false,
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
          headerRight: () => {
            return (
              <View style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                  <MaterialIcons name="logout" size={24} color={"white"} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
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
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: { color: "#333" },
          headerTintColor: "#333",
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
