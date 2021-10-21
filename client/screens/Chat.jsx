import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  FlatList,
  CardItem,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListChat from "../components/ListChat";
import { setChatsAsync } from "../stores/actions/chatAction";
import { StatusBar } from "expo-status-bar";
import { fetchUserProfile } from "../stores/actions/profileAction";
import { NativeBaseProvider, Center } from "native-base";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Chat({ navigation }) {
  const { chats, isLoading } = useSelector((state) => state.chatsState);
  const color = "#333";
  const asAuthor = chats?.chatListAuthor?.map((el) => {
    return { id: el.id, target: el.target };
  });
  const asTarget = chats?.chatListTarget?.map((el) => {
    return { id: el.id, target: el.author };
  });

  const chatsData = [...(asAuthor || []), ...(asTarget || [])];
  // console.log(chatsData, "inii chat asli");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChatsAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  if (isLoading) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3" py="64">
          <LoadingSpinner color={color} />
        </Center>
      </NativeBaseProvider>
    );
  }

  const enterChat = async (roomId, userId, chatName, photo) => {
    navigation.navigate({
      name: "Chats",
      params: {
        roomId,
        userId,
        chatName,
        photo,
      },
    });
    // });
  };

  return (
    <View>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {chatsData?.map((el) => {
          // console.log(username);
          return (
            <ListChat
              key={el.id}
              roomId={el.id}
              userId={el?.target?.id}
              photo={el?.target?.photo}
              chatName={el?.target?.username}
              enterChat={enterChat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
