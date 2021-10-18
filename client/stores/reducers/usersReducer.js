import { SET_REGISTER_USERS, SET_USERS } from "../actionType";

const initialState = {
  users: [],
  loadingUsers: false,
  errorUsers: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };

    case SET_REGISTER_USERS:
      return { ...state, users: [payload, ...state] };

    default:
      return state;
  }
}
