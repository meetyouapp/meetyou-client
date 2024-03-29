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
} from "native-base";
import { Button } from "react-native-elements";
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
    if (isLogin === true && AsyncStorage.getItem("access_token")) {
      navigation.replace("TabScreen");
    }
  }, [isLogin]);

  const loginHandler = async () => {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(loginUsersAsync(payload));
  };

  // console.log(isLogin);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../images/bg.jpg")}
        style={{ height: bgHeight }}
      >
        <View style={styles.loginView}>
          <Image
            source={{uri:'https://ik.imagekit.io/xvfgr2ixls8/Meetyou_Copy__2__qb8PI52zB.png?updatedAt=1634587281549'}}
            style={{
              height: 220,
              width: 220,
              // marginTop: 20,
            }}
          />

          {/* <Text style={styles.loginViewText}>Meet You</Text> */}
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
            <View style={styles.containerBtn}>
              <Button
                buttonStyle={styles.loginBtn}
                containerStyle={styles.button}
                raised
                onPress={loginHandler}
                title="Sign In"
              />
            </View>
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
  loginBtn: {
    backgroundColor: componentsColor,
  },
  button: {
    width: 200,
    marginTop: 10,
    backgroundColor: componentsColor,
    borderRadius: 100,
  },
  containerBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
