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

export default function Chat({ navigation }) {
  const { chats } = useSelector((state) => state.chatsState);
  const asAuthor = chats?.chatListAuthor?.map((el) => {
    return el.target;
  });
  const asTarget = chats?.chatListTarget?.map((el) => {
    return el.author;
  });

  const chatsData = [...(asAuthor || []), ...(asTarget || [])];
  console.log(chatsData, "inii chat asli");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChatsAsync());
  }, []);

  return (
    <View>
      <ScrollView>
        {chatsData?.map(({ id, photo, username }) => {
          // console.log(username);
          return (
            <ListChat key={id} id={id} photo={photo} chatName={username} />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
