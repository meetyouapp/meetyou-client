import { instance } from "../../apis/api";
import {
  SET_PLACE_DATA,
  SET_LOADING_PLACE
} from "../actionType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setPlaceData(payload) {
  return {
    type: SET_PLACE_DATA,
    payload: payload,
  };
}
export function setLoadingPlace(payload) {
  return {
    type: SET_LOADING_PLACE,
    payload: payload,
  };
}
export function fetchPlaceDataAsync() {
  return async function (dispatch) {
    dispatch(setLoadingPlace(true))
    try {
      const response = await instance({
        method: "GET",
        url: "/places",
        headers: {
          "Content-Type": "application/json",
          access_token: await AsyncStorage.getItem("access_token"),
        },
      });
      const data = response.data;
      console.log("DATA LOKASI BROK", data);
      dispatch(setPlaceData(data));
      dispatch(setLoadingPlace(false))
    } catch (error) {
      console.log(error);
    }
  };
}