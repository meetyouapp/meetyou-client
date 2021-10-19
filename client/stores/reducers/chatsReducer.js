import { SET_CHATS, SET_LOADING_CHATS } from "../actionType";

const initialState = {
  chats: {},
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CHATS:
      return { ...state, chats: payload };

    case SET_LOADING_CHATS:
      return { ...state, isLoading: payload };

    default:
      return state;
  }
}
