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
import { componentsColor } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import { db } from "../firebase";
import { fetchUserProfile } from "../stores/actions/profileAction";

export default function Chat({ navigation }) {
  const { chats } = useSelector((state) => state.chatsState);
  // console.log(chats, "sebenermya");
  const { profileData } = useSelector((state) => state.profileState);
  const [dbname, setDbname] = useState("");
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

  const enterChat = async (roomId, userId, chatName) => {
    // console.log(roomId, userId, chatName);
    // const tempDoc = {};

    // await db
    //   .collection("chats")
    //   .add({ room: roomId })
    //   .then(() => {
    navigation.navigate({
      name: "Chats",
      params: {
        roomId,
        userId,
        chatName,
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
