import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { componentsColor } from "../constants/Color";

const slides = [
  {
    key: 'one',
    title: 'Hi, welcome to',
    text: '',
    image: "https://ik.imagekit.io/xvfgr2ixls8/Meetyou_Copy__2__qb8PI52zB.png?updatedAt=1634587281549",
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Explore and Connect',
    text: 'Life is a puzzle, and we are the pieces, go find yours, and complete the whole',
    image: "https://ik.imagekit.io/xvfgr2ixls8/undraw_swipe_re_vhc5__1___3__Q08usYSEZ.png?updatedAt=1634588840998",
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Communicate',
    text: 'Express your toughts, tell your stories, get to know each other',
    image: "https://ik.imagekit.io/xvfgr2ixls8/undraw_online_dating_yruf__1__W_GDDVwAZ.png?updatedAt=1634587919992",
    backgroundColor: '#22bcb5',
  },
  {
    key: 'four',
    title: 'Create Moments',
    text: 'Go ahead and explore your new journey together',
    image: "https://ik.imagekit.io/xvfgr2ixls8/undraw_Romantic_getaway_re_3f45__1___1__Uf0BCuU3w.png?updatedAt=1634589360166",
    backgroundColor: '#22bcb5',
  }
];

export default class OnBoard extends React.Component {

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{uri: item.image}} style={styles.imageItem}></Image>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.navigate('Login')
    this.setState({ showRealApp: true });
  }
  render() {
    return (
      <AppIntroSlider renderItem={this._renderItem} 
      data={slides} 
      onDone={this._onDone}
      activeDotStyle={{backgroundColor: 'white', width: 30}}
      />
    ) 
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: componentsColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
  },
  imageItem: {
    height: 300,
    width: 340,
    margin: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    margin: 30
  }
})