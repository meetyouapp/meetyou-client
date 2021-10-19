import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  CardItem,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { componentsColor } from "../constants/Color";
import {
  NativeBaseProvider,
  Stack,
  CheckIcon,
  FormControl,
  Input,
  Icon,
  SectionList,
  Checkbox,
  List,
  Button,
} from "native-base";
import { Link } from "@react-navigation/native";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUsersAsync } from "../stores/actions/userAction";

const bgHeight = Dimensions.get("window").height / 2.5;

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin, errorLogin, access_token } = useSelector(
    (state) => state.usersState
  );

  useEffect(() => {
    if (isLogin === true && AsyncStorage.getItem("access_tokem")) {
      navigation.replace("TabScreen");
    }
  });

  const loginHandler = async () => {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(loginUsersAsync(payload));
    if (!errorLogin && isLogin === true) {
      try {
        await AsyncStorage.setItem("access_token", access_token);

        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(isLogin);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../images/bg.jpg")}
        style={{ height: bgHeight }}
      >
        <View style={styles.loginView}>
          <Image
            source={require("../images/icon-white.png")}
            style={{
              height: 120,
              width: 120,
              // marginTop: 20,
            }}
          />

          <Text style={styles.loginViewText}>Meet You</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: componentsColor, fontSize: 34 }}>Welcome</Text>
          <Text style={{ color: "black" }}>
            Don't have an account?
            <Text style={{ color: "red", fontStyle: "italic" }}>
              {" "}
              <Link to={{ screen: "Register" }}>Register now</Link>
            </Text>
          </Text>
          <View style={{ marginTop: 50 }}>
            <NativeBaseProvider>
              <Stack>
                <FormControl.Label>Your Email Address</FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  InputRightElement={
                    <CheckIcon
                      iconName="check"
                      size="4"
                      style={{ color: componentsColor }}
                    />
                  }
                  style={{ borderColor: componentsColor }}
                />
              </Stack>
              <Stack style={{ marginTop: 20 }}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  variant="underlined"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onSubmitEditing={loginHandler}
                  InputRightElement={
                    <Icon
                      as={<Ionicons name="eye-off" />}
                      size={5}
                      mr="2"
                      color={componentsColor}
                    />
                  }
                  style={{ borderColor: componentsColor }}
                />
              </Stack>
            </NativeBaseProvider>
          </View>

          <View style={styles.forgotPassword}>
            <View style={{ flex: 1, marginLeft: -20 }}>
              <NativeBaseProvider>
                {/* <List noBorder> */}
                <Stack ml={4}>
                  <Checkbox
                    accessibilityLabel="This is a dummy checkbox"
                    defaultIsChecked
                    colorScheme="info"
                  >
                    <Text
                      style={{
                        color: "#8f9195",
                        alignSelf: "flex-start",
                        marginLeft: 4,
                      }}
                    >
                      Remember Me
                    </Text>
                  </Checkbox>
                </Stack>
                {/* </List> */}
              </NativeBaseProvider>
            </View>
          </View>

          <View
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NativeBaseProvider>
              <Button
                style={styles.loginButton}
                variant="subtle"
                colorScheme="secondary" //
                onPress={loginHandler}
              >
                <Text style={{ color: "#fff" }}>Login</Text>
              </Button>
            </NativeBaseProvider>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginViewText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#fff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  forgotPassword: {
    height: 50,
    marginTop: 20,
    flexDirection: "row",
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: componentsColor,
    borderRadius: 100,
    width: Dimensions.get("window").width / 2,
    justifyContent: "center",
  },
});
