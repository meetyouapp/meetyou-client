import React, { useRef, useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View, Text } from 'react-native';
import CardsSwipe from 'react-native-cards-swipe';
import { Feather as Icon } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { borderRadius, paddingBottom, paddingTop } from 'styled-system';
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";
import { setUsersAsync, swipeRight, swipeLeft } from "../stores/actions/userAction"
import { editLocation } from "../stores/actions/profileAction"

export default function Explore({navigation}) {
  const swiper = useRef(null);
  const dispatch = useDispatch()
  let userId // untuk ambil id di dalam CardsSwipe

  const cardsData = useSelector(state => state.usersState.users)
  // console.log("data USer", cardsData);

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
      // console.log("Latitude :", location.coords.latitude);
      // console.log("Longitude :", location.coords.longitude);
      const payload = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      // console.log("INI Lokasi", payload);
      dispatch(editLocation(payload))
      dispatch(setUsersAsync())
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
              source={{uri: card?.photo}}
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
              <View style={styles.cardRow}>
                <View style={styles.cardText}>
                  <Text style={styles.cardName}>{card?.username}</Text>
                  <Text style={styles.cardAge}>{card?.age}</Text>                
                </View>
                {/* DETAIL */}  
                <TouchableOpacity
                  style={styles.cardText}
                  onPress={() => {
                  navigation.push('Detail', { id: card?.id })
                }}
                >
                  <Ionicons name="information-circle" size={30} color="white" />
                </TouchableOpacity>
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
          console.log(`saya tidak suka ${cardsData[i].username}`);
          const payload ={
            targetId: cardsData[i].id
          }
          dispatch(swipeLeft(payload))
        }}
        onSwipedRight={(i) => {
          console.log(`saya suka ${cardsData[i].username}`);
          const payload ={
            targetId: cardsData[i].id
          }
          dispatch(swipeRight(payload))
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
    paddingTop: 20,
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
  cardRow: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  cardText: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'flex-end'
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
