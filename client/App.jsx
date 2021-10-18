import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Login from "./screens/Login";
import Register from "./screens/Register";
import TabScreen from "./screens/TabScreen";
import Profile from "./screens/Profile";
import OnBoard from "./screens/OnBoard";

import { componentsColor } from "./constants/Color";
import store from "./stores";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 16,
              color: "#fff",
            },
            headerStyle: {
              backgroundColor: componentsColor,
            },
            headerTintColor: "white",
          }}
        >
          {/* <Stack.Screen name="OnBoard"  options={{ headerShown: false }} component={OnBoard} /> */}
          {/* <Stack.Screen name="Profile"  options={{ headerShown: false }} component={Profile} /> */}
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="TabScreen" component={TabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
