import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Image, FlatList, CardItem, TouchableOpacity  } from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button 
        onPress={() => navigation.push('Login')}
        title="Register"
        color="pink"
      />
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
});