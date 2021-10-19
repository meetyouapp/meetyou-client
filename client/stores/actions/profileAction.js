import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../apis/api";
import {
  SET_LOADING_PROFILE,
  SET_DATA_PROFILE
} from "../actionType";

export function setLoadingProfile(loading) {
  return {
    type: SET_LOADING_PROFILE,
    payload: loading,
  };
}

export function setDataProfile(payload) {
  return {
    type: SET_DATA_PROFILE,
    payload: payload,
  };
}

export function fetchUserProfile() {
  return async function (dispatch) {
    dispatch(setLoadingProfile(true))
    try {
      const { data } = await instance({
        method: "GET",
        url: "/profile",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });
      dispatch(setDataProfile(data))
      dispatch(setLoadingProfile(false))
    } catch (error) {
      console.log(error)
    }
  }
}