import {
  SET_REGISTER_USERS,
  SET_USERS,
  SET_LOGIN_USERS,
  SET_LOADING_USERS,
  SET_ERROR_USERS,
  SET_ERROR_LOGIN,
  SET_ERROR_REGISTER,
  SET_TOKEN_USERS,
  SET_SWIPE_RIGHT,
  SET_SWIPE_LEFT,
} from "../actionType";

const initialState = {
  users: [],
  targetUser: 0,
  loadingUsers: false,
  errorUsers: null,
  errorRegister: null,
  errorLogin: null,
  access_token: "",
  isLogin: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };

    case SET_SWIPE_RIGHT:
      return { ...state, targetUser: payload };
    
    case SET_SWIPE_LEFT:
      return { ...state, targetUser: payload };

    case SET_REGISTER_USERS:
      return { ...state, users: [payload, ...state] };

    case SET_LOGIN_USERS:
      return { ...state, isLogin: payload };

    case SET_TOKEN_USERS:
      return { ...state, access_token: payload };

    case SET_LOADING_USERS:
      return { ...state, loadingUsers: payload };

    case SET_ERROR_USERS:
      return { ...state, errorUsers: payload };

    case SET_ERROR_LOGIN:
      return { ...state, errorLogin: payload };

    case SET_ERROR_REGISTER:
      return { ...state, errorRegister: payload };

    default:
      return state;
  }
}
