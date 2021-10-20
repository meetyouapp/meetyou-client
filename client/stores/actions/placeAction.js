import { instance } from "../../apis/api";
import {
  SET_PLACE_DATA
} from "../actionType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setPlaceData(payload) {
  return {
    type: SET_PLACE_DATA,
    payload: payload,
  };
}

export function fetchPlaceDataAsync() {
  return async function (dispatch) {
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
      dispatch(setPlaceData(data));
    } catch (error) {
      console.log(error);
    }
  };
}