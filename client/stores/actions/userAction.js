import { instance } from "../../apis/api";
import {
  SET_ERROR_LOGIN,
  SET_ERROR_REGISTER,
  SET_ERROR_USERS,
  SET_LOADING_USERS,
  SET_LOGIN_USERS,
  SET_REGISTER_USERS,
  SET_TOKEN_USERS,
  SET_USERS,
} from "../actionType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  };
}

export function setLoadingUsers(loading) {
  return {
    type: SET_LOADING_USERS,
    payload: loading,
  };
}

export function setErrorUsers(error) {
  return {
    type: SET_ERROR_USERS,
    payload: error,
  };
}

export function setErrorRegister(error) {
  return {
    type: SET_ERROR_REGISTER,
    payload: error,
  };
}

export function setErrorLogin(error) {
  return {
    type: SET_ERROR_LOGIN,
    payload: error,
  };
}

export function loginUsers(isLogin) {
  // console.log(isLogin);
  return {
    type: SET_LOGIN_USERS,
    payload: isLogin,
  };
}

export function setTokenUsers(token) {
  // console.log(token, "di set token");
  return {
    type: SET_TOKEN_USERS,
    payload: token,
  };
}

export function registerUsers(user) {
  return {
    type: SET_REGISTER_USERS,
    payload: user,
  };
}

export function setUsersAsync() {
  return async function (dispatch) {
    dispatch(setLoadingUsers(true));

    try {
      // let token = await AsyncStorage.getItem('access_token')
      // console.log("Token lintrik", token);
      const response = await instance({
        method: "GET",
        url: "/users",
        headers: {
          "Content-Type": "application/json",
          access_token: await AsyncStorage.getItem("access_token"),
        },
      });
      const data = response.data;
      // console.log("DATA USER BROK", data);
      await dispatch(setUsers(data));
    } catch (error) {
      console.log(error, "atau km disini");
      dispatch(setErrorUsers(error));
    }
  };
}

export function registerUsersAsync(payload) {
  // console.log(payload);
  return function (dispatch) {
    dispatch(setLoadingUsers(true));
    instance
      .post(`/register`, payload)
      .then((res) => {
        // console.log(res);
        const data = res.data;
        // console.log(data);
        dispatch(registerUsers(data));
        console.log("register brhasil");
      })
      .catch((err) => {
        dispatch(setErrorRegister(err.response.data.message));
        console.log(err.response.data.message, "di registerrrr");
      })
      .finally(() => dispatch(setLoadingUsers(false)));
  };
}

export function loginUsersAsync(payload) {
  // console.log(payload);
  return async function (dispatch) {
    dispatch(setLoadingUsers(true));
    try {
      const response = await instance.post(`/login`, payload);
      const data = response.data;
      // console.log(data);
      dispatch(setTokenUsers(data.access_token));
      dispatch(loginUsers(true));
      await AsyncStorage.setItem("access_token", data.access_token);
    } catch (error) {
      console.log(error);
    }
  };
}
