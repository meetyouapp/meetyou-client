import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, Linking, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor, border, borderBottom, borderRadius, fontWeight } from 'styled-system';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "../stores/actions/profileAction"


const {width} = Dimensions.get("window")
const height = width * 150/100

export default function Detail({route}) {
  const dispatch = useDispatch()

  console.log(route.params.id);
  const {id} = route.params

  const userDetail  = useSelector(state => state.profileState.detailData);
  console.log(userDetail);

  useEffect(() => {
    dispatch(fetchUserDetail(id))
  }, [])

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View >
          <View>
            <View style={styles.imageScroll}>
              <ScrollView
                pagingEnabled 
                horizontal 
                style={{width, height}}
              >
                <Image 
                  style={styles.image} 
                  source={{uri: userDetail.photo }}
                />
                {
                  userDetail?.Images?.map((image, index) => (
                    <Image
                      key={index}
                      style={styles.image} 
                      source={{uri: image?.imgUrl }}
                    />
                  ))
                }
              </ScrollView>
            </View>

            <View style={styles.description}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.textName}>{userDetail.username}</Text>
                <Text style={styles.textAge}>{userDetail.age}</Text>
              </View>
              <Text style={styles.about}>About Me</Text>
              <Text style={styles.textDescription}>{userDetail.about}</Text>
              <Text style={styles.about}>Passions</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'space-between'}}>
                {
                  userDetail?.UserInterests?.map((interest, index) => (
                    <Text 
                      key={index}
                      style={styles.interestBox}
                    >{ interest?.Interest?.name }</Text>
                  ))
                }
              </View>
            </View>
            
          </View>
        </View>
      </ScrollView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  imageScroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    borderRadius: 30,
    width, 
    height: "100%", 
    resizeMode: 'cover'
  },
  description: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 30,
    borderRightColor: 'black',
    borderLeftColor: 'black',
    // borderTopWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  textName: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    color: '#555555'
  },
  textAge: {
    fontSize: 25,
    color: '#999999',
    paddingLeft: 10,
    paddingBottom: 1
  },
  textDescription: {
    fontSize: 15,
    color: '#555555',
    paddingVertical: 5,
    textAlign: 'justify'
  },
  button: {
    color: '#3e4444',
    marginVertical: 20
  },
  about: {
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 15
  },
  interestBox: {
    fontSize: 15,
    backgroundColor: 'grey',
    color: 'white',
    marginRight: 10,
    marginTop: 8,
    padding: 10,
    borderRadius: 18
  }
});