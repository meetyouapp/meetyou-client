import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  CheckBox,
  Image,
  FlatList,
  CardItem,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Text, Button } from "react-native-elements";
import { componentsColor } from "../constants/Color";
import { useDispatch } from "react-redux";
import { NativeBaseProvider, Stack } from "native-base";
import {
  setInterests,
  setInterestsAsync,
} from "../stores/actions/interestAction";
import { useSelector } from "react-redux";
import {
  loginUsersAsync,
  registerUsersAsync,
} from "../stores/actions/userAction";
import { auth } from "../firebase";
import { ErrorHandle } from "../components/errorHandle";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const interests = useSelector((state) => state.interestsState.interests);
  const { errorRegister } = useSelector((state) => state.usersState);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState();
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [interestId, setInterestId] = useState();

  useEffect(() => {
    dispatch(setInterestsAsync());
  }, []);

  function handleChecked(value, id) {
    const temp = [];
    const result = interests.map((el) => {
      if (el.id === id) {
        el.selected = value;
      }
      return el;
    });
    dispatch(setInterests(result));
    const filter = result.filter((el) => el.selected === true);
    filter.map((el) => {
      temp.push(el.id);
    });
    setInterestId(temp);
  }

  function renderInterests() {
    return interests.map((item, key) => {
      return (
        <TouchableOpacity
          style={styles.checkboxContainer}
          key={key}
          onPress={(value) => handleChecked((value = true), item.id)}
        >
          <CheckBox
            value={item.selected}
            onValueChange={(value) => handleChecked(value, item.id)}
            style={styles.checkbox}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    });
  }

  function registerHandler() {
    const payload = {
      username: username,
      email: email,
      age: age,
      password: password,
      gender: gender,
      photo:
        photo ||
        "https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png",
      about: about,
      interestId: interestId,
    };

    dispatch(registerUsersAsync(payload));
    navigation.navigate("Login");

    setUsername("");
    setEmail("");
    setPassword("");
    setPhoto("");
    setAbout("");
    setGender("");
    setAge("");
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text
        h3
        style={{
          marginBottom: 30,
          marginTop: 30,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          color: componentsColor,
        }}
      >
        Create a new account
      </Text>
      <View style={{ backgroundColor: "#f5f5f5" }}>
        <TextInput
          placeholder="Username"
          type="username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor={componentsColor}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={componentsColor}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholderTextColor={componentsColor}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="Age"
          type="age"
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholderTextColor={componentsColor}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="Photo url"
          type="photo"
          value={photo}
          onChangeText={(text) => setPhoto(text)}
          placeholderTextColor={componentsColor}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="About You"
          type="about"
          placeholderTextColor={componentsColor}
          value={about}
          onChangeText={(text) => setAbout(text)}
          style={{
            height: 80,
            borderColor: "#fff",
            borderWidth: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        <TextInput
          placeholder="Gender e.g. female"
          type="gender"
          placeholderTextColor={componentsColor}
          value={gender}
          onChangeText={(text) => setGender(text)}
          style={{
            height: 45,
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            color: "#333",
            paddingLeft: 15,
          }}
        />
        {/* <Picker
          selectedValue={gender}
          style={{
            borderWidth: 1,
            color: componentsColor,
            fontSize: 16,
            height: 45,
            padding: 10,
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
          }}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
        </Picker> */}
        <Text
          style={{
            marginTop: 30,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            color: componentsColor,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Choose Your Interest
        </Text>
        <Text
          style={{
            marginBottom: 30,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            color: componentsColor,
          }}
        >
          (Max 5)
        </Text>

        {renderInterests()}
      </View>
      <View style={styles.containerBtn}>
        <Button
          buttonStyle={styles.registerBtn}
          containerStyle={styles.button}
          raised
          onPress={registerHandler}
          title="Register"
        />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  registerBtn: {
    backgroundColor: componentsColor,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
    borderColor: componentsColor,
    borderRadius: 100,
  },
});
