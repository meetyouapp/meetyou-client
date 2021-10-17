const data = {
  username: "Olivia",
  email: "olivia@mail.com",
  age: 18,
  gender: "female",
  photo: "https://ik.imagekit.io/xvfgr2ixls8/Olivia_Rodrigo_at_White_House_yr_56Psag.jpg?updatedAt=1634357327838",
  latitude: -6.256188378560325,
  longitude: 106.85215539636121,
  about: "I sing sometimes, actually i like to sing a lot, like a a lot. Mostly sad songs, hmmm. Swipe right if you want me to annoy you with my singing hehe XD",
  Image: [
    {
      id: 1,
      imgUrl: "https://ik.imagekit.io/xvfgr2ixls8/olivia-rodrigo-social-media-photos-07-15-2020-2_thumbnail_Ym0MhlzZW.jpg?updatedAt=1634484798952"
    },
    {
      id: 2,
      imgUrl: "https://ik.imagekit.io/xvfgr2ixls8/tumblr_psud1fk1In1v3pieu_1280_MKtWNSxPleT.jpg?updatedAt=1634484799772"
    },
    {
      id: 3,
      imgUrl: "https://ik.imagekit.io/xvfgr2ixls8/olivia_rodrigo_bucket_hat_gBzSu6b10.jpeg?updatedAt=1634484801460"
    },
    {
      id: 4,
      imgUrl: "https://ik.imagekit.io/xvfgr2ixls8/tumblr_2289f038a9e39d92caba5e6bb8e33c98_fdf66a0b_1280_vGDKzJR9b.jpg?updatedAt=1634484800602"
    }
  ],
  UserInterest: [
    {
      id: 1,
      name: "singing"
    },
    {
      id: 2,
      name: "party"
    },
    {
      id: 3,
      name: "travel"
    },
    {
      id: 4,
      name: "fashion"
    },
    {
      id: 5,
      name: "cook"
    }
  ]
}

import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList, CardItem, TouchableOpacity, Dimensions  } from "react-native";
import {
  NativeBaseProvider,
  Button,
} from "native-base";
import { componentsColor } from "../constants/Color";

export default function Profile({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bgImage} ></View>
        
        <View style={styles.bottomContainer}>

            <Image style={styles.profile} source={{uri: data.photo}}></Image>
            <Text style={styles.name}>{data.username}</Text>
            <Text style={styles.ageGender}>{data.gender}, {data.age}</Text>

            <Text style={styles.about}>{data.about}</Text>
            
            <ScrollView style={styles.horizontalScroll} horizontal showsHorizontalScrollIndicator={false}>
              {
                data.Image.map(img => {
                  return (
                    <Image style={styles.userImage} source={{uri: img.imgUrl}} key={img.id}></Image>
                  )
                })
              }
              <Image style={styles.addUserImage} source={{uri: "https://ik.imagekit.io/xvfgr2ixls8/Meetyou__9___1__ZyFDB8ekN.png?updatedAt=1634497950246"}}></Image>
            </ScrollView>
            <View style={{textAlign: 'left', bottom: '14%'}}>
            {
              data.UserInterest.map(interest => {
                return (
                  <Text key={interest.id} style={styles.interest}>#{interest.name}</Text>
                )
              })
            }

            </View>
        </View>
      </View>
      <NativeBaseProvider>
        <Button
          style={styles.loginButton}
          variant="subtle"
          colorScheme="secondary" // onPress={() => console.log('hello world')}
        >
          <Text style={{ color: "#fff" }}>Edit Profile</Text>
        </Button>
      </NativeBaseProvider>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: componentsColor,
  },
  bottomContainer: {
    marginTop: '52%',
    height: '90%',
    width: 400,
    backgroundColor: 'white',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 25,
  },
  profile: {
    height: 120,
    width: 120,
    borderRadius: 25,
    bottom: "10%"
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    bottom: '8%'
  },
  ageGender: {
    fontSize: 16,
    color: 'grey',
    bottom: '8%'
  },
  about: {
    fontSize: 16,
    color: 'grey',
    bottom: '6%',
    marginLeft: 15,
    marginRight: 15
  },
  interest: {
    fontSize: 20,
    margin: 3,
    color: 'grey',
    fontWeight: 'bold',
    paddingRight: 260
  },
  horizontalScroll: {
    bottom: '10%',
    flexDirection: 'row',
    height: 250,
    width: '100%',
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
  loginButton: {
    alignSelf: "center",
    backgroundColor: componentsColor,
    borderRadius: 100,
    width: Dimensions.get("window").width / 2,
    justifyContent: "center",
    bottom: '8%'
  },
});