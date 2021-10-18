import { instance } from "../../apis/api";
import {
  SET_ERROR_USERS,
  SET_LOADING_USERS,
  SET_REGISTER_USERS,
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
        console.log(err.response, "errrorrr");
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
        dispatch(registerUsers(data));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        dispatch(setErrorUsers(err.response.data.message));
      })
      .finally(() => dispatch(setLoadingUsers(false)));
  };
}
