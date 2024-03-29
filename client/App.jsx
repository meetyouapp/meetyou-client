import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { Provider } from "react-redux";
// import Toast from "react-native-toast-message";
import Login from "./screens/Login";
import Register from "./screens/Register";
import TabScreen from "./screens/TabScreen";
import Profile from "./screens/Profile";
import Detail from "./screens/Detail";
import OnBoard from "./screens/OnBoard";
import { componentsColor } from "./constants/Color";
import store from "./stores";
import RoomChat from "./screens/RoomChat";
import VideoCall from "./screens/VideoCall";
import DatePlace from "./screens/DatePlace";
import PlaceWebView from "./screens/PlaceWebView";

export default function App(props) {
  const Stack = createNativeStackNavigator();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="OnBoard"
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
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="OnBoard"
            options={{ headerShown: false }}
            component={OnBoard}
          />
          {/* <Stack.Screen name="Profile"  options={{ headerShown: false }} component={Profile} /> */}

          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="TabScreen"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chats"
            component={RoomChat}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="Video Call" component={VideoCall} />
          <Stack.Screen name="Place for Date" component={DatePlace} />
          <Stack.Screen name="Place Detail" component={PlaceWebView} />
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
