import { SET_CHATS, SET_LOADING_CHATS } from "../actionType";
import { instance } from "../../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setChats(chats) {
  return {
    type: SET_CHATS,
    payload: chats,
  };
}

export function setLoadingChats(isLoading) {
  return {
    type: SET_LOADING_CHATS,
    payload: isLoading,
  };
}

export function setChatsAsync() {
  return async function (dispatch) {
    dispatch(setLoadingChats(true));
    try {
      const response = await instance({
        method: "GET",
        url: "/chat",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      dispatch(setChats(data));
    } catch (error) {
      console.log(error);
    }
  };
}
