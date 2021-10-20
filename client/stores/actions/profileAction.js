import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../apis/api";
import {
  SET_LOADING_PROFILE,
  SET_DATA_PROFILE,
  SET_DATA_DETAIL
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

export function setDataDetail(payload) {
  return {
    type: SET_DATA_DETAIL,
    payload: payload,
  };
}

export function fetchUserProfile() {
  return async function (dispatch) {
    dispatch(setLoadingProfile(true));
    try {
      const { data } = await instance({
        method: "GET",
        url: "/profile",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });
      dispatch(setDataProfile(data));
      dispatch(setLoadingProfile(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUserDetail(id) {
  return async function (dispatch) {
    dispatch(setLoadingProfile(true));
    try {
      const { data } = await instance({
        method: "GET",
        url: `/profile/${id}`,
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });
      dispatch(setDataDetail(data));
      dispatch(setLoadingProfile(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function editLocation(payload) {
  // console.log("woiwoi", payload);
  return async function (dispatch) {
    dispatch(setLoadingProfile(true));
    try {
      const response = await instance({
        method: "PATCH",
        url: "/profile/location",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        data: payload,
      });
      // const data = response.data;
      // console.log("INI DATA LOCATION BROK", data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function editProfileAsync(payload) {
  return async function (dispatch) {
    await dispatch(setLoadingProfile(true));
    try {
      const { data } = await instance({
        method: "PUT",
        url: "/profile",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        data: payload,
      });
      await dispatch(setLoadingProfile(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addImageAsync(payload) {
  return async function (dispatch) {
    await dispatch(setLoadingProfile(true));
    try {
      const { data } = await instance({
        method: "POST",
        url: "/image",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        data: payload,
      });
      await dispatch(setLoadingProfile(false));
    } catch (error) {
      console.log(error);
    }
  };
}