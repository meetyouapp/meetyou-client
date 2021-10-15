import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, FlatList, CardItem, TouchableOpacity  } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Profile from './Profile'
import Explore from './Explore'
import Chat from './Chat'

export default function TabScreen({navigation}) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Explore') {
            iconName = focused
              ? 'ios-home-sharp'
              : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'maroon',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <Tab.Screen name="Explore" component={Explore} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
    </Tab.Navigator>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});