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
  return function (dispatch) {
    dispatch(setLoadingUsers(true));
    instance
      .post(`/user`)
      .then((res) => {
        const data = res.data;
        dispatch(setUsers(data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(setErrorUsers(err));
      })
      .finally(() => dispatch(setLoadingUsers(false)));
  };
}

export function registerUsersAsync(payload) {
  return function (dispatch) {
    dispatch(setLoadingUsers(true));
    instance
      .post(`/register`, payload)
      .then((res) => {
        const data = res.data;
        console.log(data);
        dispatch(registerUsers(data));
        console.log("register brhasil");
      })
      .catch((err) => {
        console.log(err, "di registerrrr");
        dispatch(setErrorRegister(err.response.data.message));
      })
      .finally(() => dispatch(setLoadingUsers(false)));
  };
}

export function loginUsersAsync(payload) {
  console.log(payload);
  return function (dispatch) {
    dispatch(setLoadingUsers(true));
    instance
      .post(`/login`, payload)
      .then((res) => {
        // console.log(res, "loginn");
        const token = res.data.access_token;
        // console.log(token);
        dispatch(loginUsers(true));
        dispatch(setTokenUsers(token));
        console.log("berhasil login");
      })
      .catch((err) => {
        console.log(err, "disiniii");
        dispatch(setErrorLogin(err));
      })
      .finally(() => dispatch(setLoadingUsers(false)));
  };
}
