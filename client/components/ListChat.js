import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const ListChat = ({ roomId, userId, photo, chatName, enterChat }) => {
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(roomId.toString())
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setNewMessages(snapshot.docs.map((doc) => doc.data()));
      });

    return unsubscribe;
  }, []);

  return (
    <ListItem
      onPress={() => enterChat(roomId, userId, chatName)}
      key={roomId}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: photo,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {newMessages?.[0]?.text ? (
            newMessages?.[0]?.text
          ) : (
            <Text style={{ fontWeight: "bold" }}>
              Mulailah obrolanmu bersama dia!
            </Text>
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListChat;

const styles = StyleSheet.create({});
