import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { componentsColor } from "../constants/Color";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../stores/actions/profileAction";
import { setVideoCallAsync } from "../stores/actions/videoCallAction"

const RoomChat = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [videoCall, setVideoCall] = useState()
  const { profileData } = useSelector((state) => state.profileState);
  const data = useSelector(state => state.videoCallState.videoCall)

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(setVideoCallAsync())
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://www.onelove.org/wp-content/uploads/2015/10/missingheadshot.jpg",
            }}
          />
          <Text style={{ color: "#fff", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Video Call')}
          >
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="place" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.roomId.toString())
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    db.collection("chats")
      .doc(route.params.roomId.toString())
      .collection("messages")
      .add({
        _id,
        createdAt,
        text,
        user,
      });
  }, []);

  function videoCallHandler() {
    console.log(data, "===========")
  }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: profileData?.id,
        name: profileData?.username,
        avatar: profileData?.photo,
      }}
    />
  );
};

export default RoomChat;

const styles = StyleSheet.create({});
