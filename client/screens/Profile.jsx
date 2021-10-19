// const data = {
//   username: "Olivia",
//   email: "olivia@mail.com",
//   age: 18,
//   gender: "female",
//   photo:
//     "https://ik.imagekit.io/xvfgr2ixls8/Olivia_Rodrigo_at_White_House_yr_56Psag.jpg?updatedAt=1634357327838",
//   latitude: -6.256188378560325,
//   longitude: 106.85215539636121,
//   about:
//     "I sing sometimes, actually i like to sing a lot, like a a lot. Mostly sad songs, hmmm. Swipe right if you want me to annoy you with my singing hehe XD",
//   Image: [
//     {
//       id: 1,
//       imgUrl:
//         "https://ik.imagekit.io/xvfgr2ixls8/olivia-rodrigo-social-media-photos-07-15-2020-2_thumbnail_Ym0MhlzZW.jpg?updatedAt=1634484798952",
//     },
//     {
//       id: 2,
//       imgUrl:
//         "https://ik.imagekit.io/xvfgr2ixls8/tumblr_psud1fk1In1v3pieu_1280_MKtWNSxPleT.jpg?updatedAt=1634484799772",
//     },
//     {
//       id: 3,
//       imgUrl:
//         "https://ik.imagekit.io/xvfgr2ixls8/olivia_rodrigo_bucket_hat_gBzSu6b10.jpeg?updatedAt=1634484801460",
//     },
//     {
//       id: 4,
//       imgUrl:
//         "https://ik.imagekit.io/xvfgr2ixls8/tumblr_2289f038a9e39d92caba5e6bb8e33c98_fdf66a0b_1280_vGDKzJR9b.jpg?updatedAt=1634484800602",
//     },
//   ],
//   UserInterest: [
//     {
//       id: 1,
//       name: "singing",
//     },
//     {
//       id: 2,
//       name: "party",
//     },
//     {
//       id: 3,
//       name: "travel",
//     },
//     {
//       id: 4,
//       name: "fashion",
//     },
//     {
//       id: 5,
//       name: "cook",
//     },
//   ],
// };

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
import { fetchUserProfile } from "../stores/actions/profileAction";

export default function Profile({ navigation }) {
  const data = useSelector(state => state.profileState.profileData)
  const loading = useSelector(state => state.profileState.loadingProfile)
  // console.log('================', datax, '==============')
  let dispatch = useDispatch()

  useEffect(() => {
    getStorage();
    dispatch(fetchUserProfile())
  }, []);

  const getStorage = async () => {
    try {
      await AsyncStorage.getItem("access_token").then((value) =>
        console.log(value, "token di home")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [popUpAddImage, setpopUpAddImage] = useState(false);
  const [popUpEditProfile, setpopUpEditProfile] = useState(false);
  const [text, setText] = useState("");

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
            {data?.Images.map((img) => {
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
            {data?.UserInterests.map(({Interest}) => {
              return (
                <Text key={Interest.id} style={styles.interest}>
                  #{Interest.name}
                </Text>
              );
            })}

          </View>
            <GestureRecognizer onSwipeDown={ () => setpopUpAddImage(false) }>
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

            <GestureRecognizer onSwipeDown={ () => setpopUpEditProfile(false) }>
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
                          defaultValue={data?.age.toString()}
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
    top: '24%'
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
