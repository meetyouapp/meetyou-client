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
import GestureRecognizer from "react-native-swipe-gestures";
import { componentsColor } from "../constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../stores/actions/profileAction";

export default function Profile({ navigation }) {
  const data = useSelector((state) => state.profileState.profileData);
  const loading = useSelector((state) => state.profileState.loadingProfile);
  // console.log('================', data, '==============')
  let dispatch = useDispatch();

  useEffect(() => {
    // getStorage();
    dispatch(fetchUserProfile());
  }, []);

  // const getStorage = async () => {
  //   try {
  //     await AsyncStorage.getItem("access_token").then((value) =>
  //       console.log(value, "token di home")
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [popUpAddImage, setpopUpAddImage] = useState(false);
  const [popUpEditProfile, setpopUpEditProfile] = useState(false);
  const [text, setText] = useState("");

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bgImage}></View>

        <View style={styles.bottomContainer}>
          <Image style={styles.profile} source={{ uri: data?.photo }}></Image>
          <Text style={styles.name}>{data?.username}</Text>
          <Text style={styles.ageGender}>
            {data?.gender}, {data?.age}
          </Text>

          <Text style={styles.about}>{data?.about}</Text>

          <ScrollView
            style={styles.horizontalScroll}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data?.Images?.map((img) => {
              return (
                <Image
                  style={styles.userImage}
                  source={{ uri: img.imgUrl }}
                  key={img.id}
                ></Image>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                setpopUpAddImage(true);
              }}
            >
              <Image
                style={styles.addUserImage}
                source={{
                  uri: "https://ik.imagekit.io/xvfgr2ixls8/Meetyou__9___1__ZyFDB8ekN.png?updatedAt=1634497950246",
                }}
              ></Image>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ textAlign: "left", bottom: "14%" }}>
            {data?.UserInterests?.map(({ Interest }) => {
              return (
                <Text key={Interest.id} style={styles.interest}>
                  #{Interest.name}
                </Text>
              );
            })}
          </View>
          <GestureRecognizer onSwipeDown={() => setpopUpAddImage(false)}>
            <View>
              <Modal
                style={styles.centeredView}
                animationType="slide"
                transparent={true}
                visible={popUpAddImage}
                onRequestClose={() => {
                  setpopUpAddImage(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add New Photo</Text>
                    <View style={{ padding: 10 }}>
                      <TextInput
                        style={styles.inputUrl}
                        placeholder="Add Image Url"
                        onChangeText={(text) => setText(text)}
                        defaultValue={text}
                      />
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 24,
                          textAlign: "center",
                        }}
                      >
                        {text}
                      </Text>
                    </View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setpopUpAddImage(false)}
                    >
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </GestureRecognizer>

          <GestureRecognizer onSwipeDown={() => setpopUpEditProfile(false)}>
            <View>
              <Modal
                style={styles.centeredView2}
                animationType="slide"
                transparent={true}
                visible={popUpEditProfile}
                onRequestClose={() => {
                  setpopUpEditProfile(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Edit Profile</Text>
                    <View style={{ padding: 10 }}>
                      <Text style={styles.inputTitle}>Username</Text>
                      <TextInput
                        style={styles.inputUrl}
                        placeholder="Name"
                        defaultValue={data?.username}
                      />
                      <Text style={styles.inputTitle}>About me</Text>
                      <TextInput
                        style={styles.inputUrl}
                        placeholder="About"
                        defaultValue={data?.about}
                      />
                      <Text style={styles.inputTitle}>Age</Text>
                      <TextInput
                        style={styles.inputUrl}
                        keyboardType="numeric"
                        defaultValue={data?.age?.toString()}
                      />
                      <Text style={styles.inputTitle}>Gender</Text>
                      <Picker selectedValue={data?.gender}>
                        <Picker.Item label="male" value="male" />
                        <Picker.Item label="female" value="female" />
                      </Picker>
                    </View>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setpopUpEditProfile(false)}
                    >
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </GestureRecognizer>
        </View>
      </View>
      <Pressable
        style={[styles.buttonForEditProfile, styles.buttonClose]}
        onPress={() => setpopUpEditProfile(true)}
      >
        <Text style={styles.textStyle}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // styling for pop up
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: componentsColor,
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputUrl: {
    borderColor: componentsColor,
    borderWidth: 1.5,
    borderRadius: 30,
    height: 50,
    width: 300,
    textAlign: "center",
  },
  // styling for page
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: componentsColor,
  },
  bottomContainer: {
    marginTop: "32%",
    height: "90%",
    width: 400,
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 25,
  },
  profile: {
    height: 120,
    width: 120,
    borderRadius: 25,
    bottom: "10%",
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    bottom: "8%",
  },
  ageGender: {
    fontSize: 16,
    color: "grey",
    bottom: "8%",
  },
  about: {
    fontSize: 16,
    color: "grey",
    bottom: "6%",
    marginLeft: 15,
    marginRight: 15,
  },
  interest: {
    fontSize: 20,
    margin: 3,
    color: "grey",
    fontWeight: "bold",
    paddingRight: 260,
    top: "24%",
  },
  horizontalScroll: {
    bottom: "10%",
    flexDirection: "row",
    height: 250,
    width: "100%",
    paddingTop: 12,
    marginBottom: 10,
  },
  userImage: {
    height: 250,
    width: 175,
    borderRadius: 25,
    marginLeft: 8,
  },
  addUserImage: {
    height: 250,
    width: 175,
    borderRadius: 25,
    marginLeft: 8,
    borderColor: componentsColor,
    borderWidth: 2,
  },
  buttonForEditProfile: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: 200,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputTitle: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 6,
    fontWeight: "bold",
  },
});
