import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, FlatList, CardItem, TouchableOpacity  } from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.button}>Login</Text>
      <View style={styles.button}>
        <Button 
          onPress={() => navigation.push('TabScreen')}
          title="Login"
          color="pink"
        />
      </View>
      <View style={styles.button}>
        <Button 
          onPress={() => navigation.push('Register')}
          title="Register"
          color="pink"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10
  }
});