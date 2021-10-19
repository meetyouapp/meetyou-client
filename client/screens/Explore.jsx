import React, { useRef, useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import CardsSwipe from 'react-native-cards-swipe';
import { Feather as Icon } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { borderRadius, paddingBottom, paddingTop } from 'styled-system';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from "react-redux";
import { setUsersAsync } from "../stores/actions/userAction"


const cardsData = [
  {
    "username": "Chris",
    "email": "chris@mail.com",
    "age": 38,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/rs_600x600-171023061437-600.sydney-chris-hemsworth.102317_iD5Yb6Dk0g8.jpg?updatedAt=1634356824828",
    "latitude": -6.174054416454042,
    "longitude": 106.82663976097285,
    "about": "I like playing video games"
  },
  {
    "username": "Alexandra",
    "email": "alexandra@mail.com",
    "age": 35,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/alexandra-daddario-9_68hFtvYdI.jpeg?updatedAt=1634356958552",
    "latitude": -6.195938266706561,
    "longitude": 106.87539230028732,
    "about": "heyyy"
  },
  {
    "username": "Tom",
    "email": "tom@mail.com",
    "age": 40,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/o-img-52826-profil-tom-hiddleston-instagramattwhiddleston_xDsjv4lCp.jpg?updatedAt=1634357047310",
    "latitude": -6.168078557968378,
    "longitude": 106.80451228299692,
    "about": "i am loki hehe"
  },
  {
    "username": "Zendaya",
    "email": "zendaya@mail.com",
    "age": 25,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/Screenshot1906-6fc696a44dba4097a4a42961f77f244f_Ue8nyseaV.png?updatedAt=1634357095193",
    "latitude": -6.176936266266579,
    "longitude": 106.7906564036936,
    "about": "Hola!"
  },
  {
    "username": "Ryan",
    "email": "ryan@mail.com",
    "age": 44,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/e806d55846a9922f6a493d625b_Z1ttkp1R_.jpg?updatedAt=1634357195762",
    "latitude": -6.136735626512776,
    "longitude": 106.82385203855668,
    "about": "you know who i am"
  },
  {
    "username": "Olivia",
    "email": "olivia@mail.com",
    "age": 18,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/Olivia_Rodrigo_at_White_House_yr_56Psag.jpg?updatedAt=1634357327838",
    "latitude": -6.256188378560325,
    "longitude": 106.85215539636121,
    "about": "i sing sometimes"
  },
  {
    "username": "tommy",
    "email": "tommy@mail.com",
    "age": 45,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/EPIBjaFWkAIeyNn_eFsV3A3d1.jpg?updatedAt=1634357559828",
    "latitude": -7.781479054321451,
    "longitude": 110.36684298617195,
    "about": "by order of peaky blinders hehe"
  },
  {
    "username": "anna",
    "email": "anna@mail.com",
    "age": 25,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/any-taylor-joy-cabelo_yqm_X_1DZdL.jpg?updatedAt=1634357631040",
    "latitude": -7.8029778987690435,
    "longitude": 110.36459875375445,
    "about": "the girl behind queen gambit"
  },
  {
    "username": "lisa",
    "email": "lisa@mail.com",
    "age": 24,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/lalalalisa-m-p-2129195502268248962-2-2129195498174662945-e35588c60285f48c50afbf6fa9e5319a_t4YTEYd7th-.jpg?updatedAt=1634357815234",
    "latitude": -7.8078898717534075,
    "longitude": 110.36003225958564,
    "about": "heyy, let us be friends mmkay?"
  },
  {
    "username": "jennie",
    "email": "jennie@mail.com",
    "age": 25,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/97cbb7e069fa5ad355a45bbd2eaa3a67_SQQXXZOha_v.jpg?updatedAt=1634357871599",
    "latitude": -7.77125713080948,
    "longitude": 110.3775427118167,
    "about": "am i prettier than lisa?"
  },
  {
    "username": "rose",
    "email": "rose@mail.com",
    "age": 24,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/8a27968386a2e26b5cfcd9828185931e_qYy704QdO.jpg?updatedAt=1634357898699",
    "latitude": -7.605901490942493,
    "longitude": 110.20318518076614,
    "about": "swipe right if you need someone to talk to :)"
  },
  {
    "username": "park",
    "email": "park@mail.com",
    "age": 32,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/uk43076n9944w8b8u275-511a2622c15682bac228c68284743d7b_50QF1cb_6.jpg?updatedAt=1634358107901",
    "latitude": -7.2649781220396985,
    "longitude": 112.75055848207339,
    "about": "visit us at danbam, itaewon"
  },
  {
    "username": "hanso",
    "email": "hanso@mail.com",
    "age": 26,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/017641300_1588523448-80483097_2526088677513560_6579602214997952877_n_1KfFKb83B.webp?updatedAt=1634358366080",
    "latitude": -7.261208465565662,
    "longitude": 112.73818187104823,
    "about": "<3"
  },
  {
    "username": "eiza",
    "email": "eiza@mail.com",
    "age": 31,
    "gender": "female",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/images__2__VlDQH7mQQ.jpeg?updatedAt=1634358543649",
    "latitude": -7.287843601178624,
    "longitude": 112.68722174607448,
    "about": "hit me up!"
  },
  {
    "username": "zayn",
    "email": "zayn@mail.com",
    "age": 28,
    "gender": "male",
    "photo": "https://ik.imagekit.io/xvfgr2ixls8/991942686_673eOMGu4.jpeg?updatedAt=1634358611346",
    "latitude": -7.2981009715553595,
    "longitude": 112.67293784383718,
    "about": "i have no idea why im here"
  }
];

export default function Explore({navigation}) {
  const swiper = useRef(null);

  const dispatch = useDispatch()

  const userData = useSelector(state => state.users)
  console.log("data USer", userData);

  useEffect(() => {
    dispatch(setUsersAsync())
    // console.log(userData);
  }, [])

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <CardsSwipe
        ref={swiper}
        cards={cardsData}
        containerStyle={styles.cardsSwipeContainer}
        cardContainerStyle={styles.cardContainer}
        loop={false}
        renderCard={(card) => (
          <View style={styles.card}>
            <ImageBackground
              style={styles.cardImg}
              imageStyle={{ borderRadius: 25}}
              source={{uri: card.photo}}
            > 
              <LinearGradient 
                colors={['#00000000', '#00000000', 'black']} 
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: '100%',
                  borderRadius: 25
                }}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardName}>{card.username}</Text>
                <Text style={styles.cardAge}>{card.age}</Text>                
              </View>

            </ImageBackground>
          </View>
        )}
        renderNoMoreCard={() => (
          <View style={styles.noMoreCard}>
            <Text>{'No more Cards!'}</Text>
          </View>
        )}
        renderYep={() => (
          <View style={styles.like}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </View>
        )}
        renderNope={() => (
          <View style={styles.nope}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </View>
        )}
        onSwipedLeft={(i) => {
          console.log(`saya benci ${cardsData[i].username}`);
        }}
        onSwipedRight={(i) => {
          console.log(`saya suka ${cardsData[i].username}`);
        }}
      />
      <View style={styles.controlRow}>
        {/* DISLIKE */}
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
          style={[styles.button, styles.leftBtn]}
        >
          <Icon name="x" size={32} color="#ec5288" />
        </TouchableOpacity>

        {/* DETAIL */}  
        <TouchableOpacity
          onPress={() => {
          navigation.push('Detail')
        }}
        >
          <Ionicons name="information-circle" size={50} color="black" />
        </TouchableOpacity>

        {/* LIKE */}
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeRight();
          }}
          style={[styles.button, styles.rightBtn]}
        >
          <Icon name="heart" size={32} color="#6ee3b4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsSwipeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 50,
    zIndex: 1,
    elevation: 1,
  },
  cardContainer: {
    width: '92%',
    height: '100%'
  },
  card: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    elevation: 6
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  cardText: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 20
  },
  cardName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  cardAge: {
    fontSize: 20,
    color: 'white'
  },
  noMoreCard: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    padding: 14,
    borderWidth: 3,
    borderRadius: 35,
  },
  rightBtn: {
    borderColor: '#00D400',
  },
  leftBtn: {
    borderColor: '#E60000',
  },
  likeIcon: {
    width: 40,
    height: 40,
    top: -3,
  },
  dislikeIcon: {
    width: 40,
    height: 40,
    top: 3,
  },
  nope: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginRight: 30,
    marginTop: 25,
    borderColor: 'red',
    transform: [{ rotateZ: '22deg' }],
  },
  nopeLabel: {
    fontSize: 32,
    color: 'red',
    fontWeight: 'bold',
  },
  like: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginLeft: 30,
    marginTop: 20,
    borderColor: 'lightgreen',
    transform: [{ rotateZ: '-22deg' }],
  },
  likeLabel: {
    fontSize: 32,
    color: 'lightgreen',
    fontWeight: 'bold',
  },
});
