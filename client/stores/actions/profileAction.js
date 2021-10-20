import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../apis/api";
import {
  SET_LOADING_PROFILE,
  SET_DATA_PROFILE,
  SET_LATITUDE,
  SET_LONGITUDE
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

export function setLatitude(payload) {
  return {
    type: SET_LATITUDE,
    payload: payload,
  };
}

export function setlongitude(payload) {
  return {
    type: SET_LONGITUDE,
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

export function editLocation(payload) {
  console.log("woiwoi", payload);
  return async function (dispatch) {
    dispatch(setLoadingProfile(true))
    try {
      const response = await instance({
        method: 'PATCH',
        url: '/profile/location',
        headers: {
          access_token: await AsyncStorage.getItem('access_token'),
          "Content-Type": "application/json"
        },
        data: payload
      })
      // const data = response.data;
      // console.log("INI DATA LOCATION BROK", data);
    } catch (error) {
      console.log(error);
    }
  };
}