import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const ListChat = ({ id, photo, chatName, enterChat }) => {
  // console.log(chatName, "diphoto");
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: photo,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a example test test lalallala okee khahahah maskaa
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListChat;

const styles = StyleSheet.create({});
