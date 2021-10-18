import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const ListChat = (id, chatName, enterChat) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Youtube Chat
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
