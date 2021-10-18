import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, Linking, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
// import { GET_PRODUCT } from "../apollo/query";

const {width} = Dimensions.get("window")
const height = width * 150/100

export default function Detail({route}) {
  // console.log(route.params.id);
  // const {id} = route.params

  // const { loading, error, data } = useQuery(GET_PRODUCT, {
  //   variables: {
  //     id: id
  //   }
  // })

  // if (loading) return <Text>Loading...</Text>

  // if (error) return <Text>Error {JSON.stringify(error)}</Text> 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                  source={{uri: "https://ik.imagekit.io/xvfgr2ixls8/rs_600x600-171023061437-600.sydney-chris-hemsworth.102317_iD5Yb6Dk0g8.jpg?updatedAt=1634356824828" }}
                />
                <Image 
                  style={styles.image} 
                  source={{uri: "https://pbs.twimg.com/media/Eav5wDGXsAEMUL5.jpg" }}
                />
                  <Image 
                    style={styles.image} 
                    source={{uri: "https://images.immediate.co.uk/production/volatile/sites/3/2017/10/Thor-Ragnarok-Chris-Hemsworth-0c93964.jpg?quality=90&resize=620,413" }}
                  />
              </ScrollView>
            </View>

            <View style={{ padding: 10}}>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <Text style={styles.textName}>Chris Hemsworth, </Text>
                <Text style={styles.textName}>38</Text>
              </View>
              
              <Text style={styles.textPrice}>I like playing video games</Text>

            </View>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "100%",    
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  imageScroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width, 
    height: 600, 
    resizeMode: 'cover'
  },
  textCategory: {
    fontSize: 12,
    color: 'grey',
    paddingBottom: 5
  },
  textName: {
    fontSize: 20,
    color: 'black',
    paddingBottom: 5
  },
  textPrice: {
    fontSize: 15,
    color: '#3e4444',
    paddingBottom: 10
  },
  textDescription: {
    fontSize: 15,
    color: '#3e4444',
    paddingBottom: 5,
    textAlign: 'justify'
  },
  button: {
    color: '#3e4444',
    marginVertical: 20
  }
});