import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, Linking, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor, border, borderBottom, borderRadius, fontWeight, style } from 'styled-system';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "../stores/actions/profileAction"


const {width} = Dimensions.get("window")
const height = width * 150/100


export default function Detail({route}) {
  const dispatch = useDispatch()

  console.log(route.params.id);
  const {id} = route.params

  const loading = useSelector(state => state.profileState.loadingProfile)
  const userDetail  = useSelector(state => state.profileState.detailData);
  console.log(userDetail);

  useEffect(() => {
    dispatch(fetchUserDetail(id))
  }, [])

  if(loading) {
    return (
      <View style={styles.loading}>
        <Image
          source={require("../images/loading.gif")}
          style={{
            width: "50%", 
            height: "30%",
            margin: 10
          }}
        />
      </View>
    )
  }

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
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8}}>
                <Text style={styles.textName}>{userDetail.username}</Text>
                <Text style={styles.textAge}>{userDetail.age}</Text>
              </View>
              <View style={{ paddingBottom: 10}}>
                <Text style={styles.about}>About Me</Text>
                <Text style={styles.textDescription}>{userDetail.about}</Text>
              </View>
              {/* <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 15, marginVertical: 10}}> */}
              
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
              {/* </View> */}
            </View>
            
          </View>
        </View>
      </ScrollView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  pagingText: {
    color: 'black',
    margin: 3
  },
  pagingActiveText: {
    color: '#C9CCD5',
    margin: 3
  },
  imageScroll: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    width, 
    height: "100%", 
    resizeMode: 'cover'
  },
  description: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#EEEEEE',
    // borderRadius: 30,
    // borderRightColor: 'black',
    // borderLeftColor: 'black',
    // borderTopWidth: 1,
    // borderRightWidth: 2,
    // borderLeftWidth: 2,
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
    // paddingTop: 15,
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
    borderRadius: 15
  }
});